# ArcVoice Backend — API Documentation

This document provides a complete reference of the project's API (as implemented in the codebase). The documentation covers each available API endpoint, expected requests, example curl requests, successful and error responses, and notes about authentication and edge cases.

> Generated from project sources: endpoints under `api/accounts/`, OAuth callback `/oauth2/callback`, and drf-spectacular schema/docs routes.

--

## Base URLs

- Development server: http://127.0.0.1:8000
- API root for accounts endpoints: `/api/accounts/`
- OAuth2 server callback: `/oauth2/callback`
- OpenAPI schema (JSON): `/api/schema/`
- Swagger UI (interactive docs): `/api/docs/`
- ReDoc UI: `/api/redoc/`


## Response envelope (project convention)

Most endpoints return a JSON envelope in this form (helpers in `accounts/components/base_response.py`):

Success response format

{
  "status": "success",
  "message": "Human-friendly message",
  "data": <payload or null>
}

Error response format

{
  "status": "error",
  "message": "Human-friendly error message"
}

All status codes and HTTP statuses are set by views. For auth-related endpoints, `200` typically indicates success and `400` indicates client errors.

---

# Endpoints (full details)

### 1) POST /api/accounts/register/  — Register a new user

Description
- Creates a new `User` in the database (uses `accounts.views.RegisterView` - `CreateAPIView`) using `UserSerializer`.

Note: The current `UserSerializer` does NOT include a `password` field (see `accounts/serializers/user_serializer.py`). This means creating a user via this endpoint will not set a password and the user will not be able to login with a username/password until a password is set (this may be intentional for OAuth-first flows). If you want a password-based registration flow, consider augmenting the serializer and `perform_create` to set the password via `set_password()`.

Request
- Content-Type: application/json
- Body (example) — fields come from `UserSerializer`:

{
  "username": "kings",
  "email": "you@example.com",
  "agent_name": "Kai",
  "use_case": "Help me build voice assistants",
  "agent_personality": "Warm and concise",
  "profile_image": "https://example.com/profile.jpg"
}

Response (successful create)
- HTTP 201 (CreateAPIView default)
- Body (envelope) — `data` will be the created user serialized using `UserSerializer`:

{
  "status": "success",
  "message": "Created",
  "data": {
    "id": 42,
    "username": "kings",
    "email": "you@example.com",
    "agent_name": "Kai",
    "use_case": "Help me build voice assistants",
    "agent_personality": "Warm and concise",
    "profile_image": "https://example.com/profile.jpg"
  }
}

Error responses
- 4xx error codes if validation fails or a user with the email already exists. Example:

{
  "status": "error",
  "message": "A user with this email already exists"
}

Curl example

curl -X POST http://127.0.0.1:8000/api/accounts/register/ \
  -H 'Content-Type: application/json' \
  -d '{"username":"kings","email":"you@example.com","agent_name":"Kai"}'

---

### 2) POST /api/accounts/login/  — Login with username/password

Description
- A login endpoint implemented in `accounts.views.LoginView` (APIView).
- Accepts `username` and `password` in JSON body, authenticates using Django `authenticate()` and returns JWT tokens (via `rest_framework_simplejwt`) if credentials are valid.

Request
- Content-Type: application/json
- Body payload (example):

{
  "username": "kings",
  "password": "mysecret"
}

Successful response
- HTTP 200
- Body (envelope):

{
  "status": "success",
  "message": "Login successful",
  "data": {
    "access": "<JWT access token>",
    "refresh": "<JWT refresh token>"
  }
}

Error response (invalid credentials)
- HTTP 200 (current implementation wraps in error helper with HTTP 200? — historically `error` helper uses response with status=400 if specified; LoginView returns error("Invalid credentials") without explicit status which uses default 400 in error() — so expect 400.)

{
  "status": "error",
  "message": "Invalid credentials"
}

Curl example

curl -X POST http://127.0.0.1:8000/api/accounts/login/ \
  -H 'Content-Type: application/json' \
  -d '{"username":"kings","password":"mysecret"}'

Notes
- The access token is a short-lived JWT (configured via `SIMPLE_JWT` settings). Use `Authorization: Bearer <access_token>` in subsequent API calls.

---

### 3) POST /api/accounts/google/ — Exchange Google authorization code for tokens

Description
- `GoogleAuthView` accepts a request body with `code` (authorization code from Google). It calls `accounts.utils.google_oauth.verify_google_token` to exchange code for Google tokens/userinfo, registers/gets the User, stores GoogleAccount data and returns the project's JWT tokens.

Request
- Content-Type: application/json
- Body:
{
  "code": "<authorization_code_returned_by_google>"
}

Successful response
- HTTP 200
- Body shape (envelope):
{
  "status": "success",
  "message": "Google login successful",
  "data": {
    "access": "<JWT access token>",
    "refresh": "<JWT refresh token>"
  }
}

Error cases
- If `code` is missing — returns an error response with 400.
- If Google's token endpoint returns errors (invalid_grant, invalid_client, redirect_uri_mismatch, missing client ID), `verify_google_token` now raises a descriptive ValueError and view returns a 400 with message. Example:

{"status":"error","message":"Google OAuth error: Failed to exchange code for token: Could not determine client ID from request."}

Notes / PKCE
- If your OAuth flow uses PKCE (client-side code flow), the code exchange requires the `code_verifier` used during the authorization request. The current POST /api/accounts/google/ implementation expects only `code`. If your frontend uses PKCE you should send the `code_verifier` to the server and pass it during token exchange.

Curl example

curl -X POST http://127.0.0.1:8000/api/accounts/google/ \
  -H 'Content-Type: application/json' \
  -d '{"code":"<auth_code>"}'

---

### 4) GET /oauth2/callback  — Server-side OAuth2 callback

Description
- This endpoint handles server-side OAuth redirects from Google (redirect URI). When Google redirects back to `/oauth2/callback?code=<code>&state=<state>` the server exchanges the code for tokens, creates/updates user data and returns the project's JWT tokens.

Request (example)
- Example URL visited by the browser after Google consent:

http://127.0.0.1:8000/oauth2/callback?code=<authorization_code>&state=<state>

Successful response
- HTTP 200
- Body (envelope): same as other login endpoints — returns access/refresh tokens

Error cases
- Missing `code` query param → 400 error
- Token exchange failure → 400 with Google error message

Notes
- Make sure the redirect URI configured in Google Cloud Console matches this URI exactly (including scheme, host, port and path) — otherwise Google token exchange will fail with redirect_uri_mismatch or client verification errors.

---

## Authentication

- JWT-based using `djangorestframework-simplejwt`.
- After login (or Google login) you receive `access` & `refresh` tokens.
- Use the `access` token for authenticated endpoints in the `Authorization` header:

  Authorization: Bearer <access_token>

- Access token lifetime is configured in `SIMPLE_JWT` in `config/settings/base.py`.

---

## OpenAPI schema & docs

- Live OpenAPI JSON: `/api/schema/` — returns raw OpenAPI JSON generated by drf-spectacular.
- Interactive Swagger UI: `/api/docs/` — great for exploring and trying endpoints.
- ReDoc UI: `/api/redoc/` — alternative UI.
- You can generate a static schema file for CI/hosting using:

```bash
py manage.py spectacular --file docs/openapi.yml
```

---

## Implementation notes / suggestions (current code base)

- Registration does not accept `password` in `UserSerializer`. If you expect password-based logins, add `password` to the serializer and call `user.set_password()` in `perform_create()`.
- `verify_google_token` now validates the token exchange and userinfo responses and handles `expires_in` being missing. If you rely on PKCE add `code_verifier` handling.
- For the `/oauth2/callback` path, consider redirecting to your frontend app and either pass tokens as URL fragments or set HttpOnly cookies rather than returning JSON (depends on app architecture).
- Add `@extend_schema` annotations across your views (I added basic ones for the auth endpoints). For complete docs, annotate other endpoints as you add them.

---

## Quick troubleshooting / diagnostics

1) If Google token exchange fails: check `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and that your `redirect_uri` in Google Cloud Console exactly matches the redirect the app uses.
2) If the schema shows "No operations defined in spec!": ensure your `config/urls.py` is not overwriting `urlpatterns` and that your views are reachable via `ROOT_URLCONF`.

---
