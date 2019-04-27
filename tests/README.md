# Testing & Linting

## Testing

### Requirements

To run the tests you must have a GCP project with a Service Account. The
Service Account's should have a role of "owner". Include the Service Account's
JSON keyfile in the `tests/` directory,  and named, `keyfile.json`.

### Command

Run `npm test` from Mashr's root directory.

## Linting

### Style

We use the `eslint-config-strongloop` style with `eslint`. Please see this
article for details.

https://medium.com/the-node-js-collection/why-and-how-to-use-eslint-in-your-project-742d0bc61ed7

### Command

To automatically fix styling issues, run `npm pretest` from Mashr's root
directory.

If `npm pretest` results in errors, try:

```
./node_modules/.bin/eslint --fix --ignore-path .gitignore .
```
