# NC News Seeding

## Setup: Environment Files

Run `npm install` to install dependencies, which includes dotenv
The connections file has been set up for you

To connect to your local databases, you need to create two environment files in the root directory:

- `.env.development`
- `.env.test`

Each file should contain a single line specifying the relevant database name. For example:

**.env.development**

```
PGDATABASE=dev_database_name
```

**.env.test**

```
PGDATABASE=test_database_name
```

Ensure you replace these names with your database names.

Make sure these files are **not** committed to version control (they are already included in `.gitignore`).

You will also need to ensure your PostgreSQL server is running and that both databases exist locally.
