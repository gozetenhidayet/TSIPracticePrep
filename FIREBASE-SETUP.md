# ScorePath Firebase Setup

**This file is an early, high-level sketch — `BACKEND-SETUP.md` is the
current, complete, step-by-step guide** (server-side question serving,
real teacher accounts, and cross-device classroom sync, in the exact order
to set them up, including the actual `firestore.rules` and
`database.rules.json` this repo ships with). Use that file, not this one.

The short version this file used to leave unfinished — now actually done
in the code, not just described here — is real: this repo now ships real
production `firestore.rules` (default-deny, with a scoped self-profile
exception for signed-in teachers) and a real `database.rules.json`
(scopes classroom room events to `rooms/{roomCode}/events`, default-deny
everywhere else), instead of the "replace the development rules yourself"
instruction this file used to leave as an exercise for the reader.

Everything stays fully local/static (`BroadcastChannel` for same-device
classroom demo, static-preview teacher login) until you actually configure
Firebase per `BACKEND-SETUP.md` — nothing here activates on its own.
