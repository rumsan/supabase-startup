# Self-Hosted Supabase

## Overview

This repository contains a Docker-based setup for self-hosting Supabase, an open-source Firebase alternative. Supabase provides a suite of tools and services for building modern applications including:

- **PostgreSQL Database**: A powerful, open-source relational database
- **Authentication**: User management and authentication system
- **Auto-generated APIs**: Instant RESTful and GraphQL APIs
- **Realtime Subscriptions**: Live data updates via WebSockets
- **Storage**: File storage and management
- **Edge Functions**: Serverless functions for custom logic

## Benefits of Self-Hosting

- **Data Ownership**: Complete control over your data and infrastructure
- **Privacy**: Keep sensitive data within your own environment
- **Customization**: Tailor the setup to your specific needs
- **Cost Control**: Manage your own infrastructure costs
- **No Vendor Lock-in**: Freedom to modify and extend as needed

## Prerequisites

- Docker and Docker Compose installed on your system
- Basic understanding of Docker containers and networking
- Minimum system requirements:
  - 2 CPU cores
  - 4GB RAM
  - 20GB storage space

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd supabase-starter
   ```

2. Navigate to the Supabase Docker directory:

   ```bash
   cd Supabase-Docker
   ```

3. Configure your environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file to update the default credentials and configuration.

4. Start the Supabase services:

   ```bash
   docker compose up -d
   ```

5. Access the Supabase Studio dashboard:
   ```
   http://localhost:8000
   ```
   Login with the credentials specified in your `.env` file (default: username: `supabase`, password: check `DASHBOARD_PASSWORD` in your `.env` file).

## Configuration

### Essential Environment Variables

- **Security Credentials**:

  - `POSTGRES_PASSWORD`: PostgreSQL database password
  - `JWT_SECRET`: Secret key for JWT token generation
  - `ANON_KEY` and `SERVICE_ROLE_KEY`: API access keys
  - `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD`: Studio dashboard login credentials

- **Database Configuration**:

  - `POSTGRES_HOST`: Database host (default: `db`)
  - `POSTGRES_DB`: Database name (default: `postgres`)
  - `POSTGRES_PORT`: Database port (default: `5432`)

- **API and Services**:
  - `KONG_HTTP_PORT`: HTTP port for the API gateway (default: `8000`)
  - `KONG_HTTPS_PORT`: HTTPS port for the API gateway (default: `8443`)
  - `SITE_URL`: Your application's URL (default: `http://localhost:3000`)

### Email Configuration

To enable email authentication and notifications:

1. Update the SMTP settings in your `.env` file:

   ```
   ENABLE_EMAIL_SIGNUP=true
   SMTP_ADMIN_EMAIL=your-email@example.com
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   SMTP_SENDER_NAME=Your App Name
   ```

2. Customize email templates by setting the template URLs:
   ```
   GOTRUE_MAILER_TEMPLATES_INVITE=https://your-template-url/invite.html
   GOTRUE_MAILER_TEMPLATES_CONFIRMATION=https://your-template-url/confirmation.html
   GOTRUE_MAILER_TEMPLATES_RECOVERY=https://your-template-url/recovery.html
   GOTRUE_MAILER_TEMPLATES_MAGIC_LINK=https://your-template-url/magic_link.html
   ```

## Directory Structure

- `/Supabase-Docker`: Main directory containing Docker configuration
  - `docker-compose.yml`: Docker Compose configuration file
  - `.env`: Environment variables configuration
  - `/volumes`: Persistent data storage
    - `/api`: API gateway configuration
    - `/db`: PostgreSQL database files and initialization scripts
    - `/functions`: Edge functions
    - `/logs`: Log files
    - `/pooler`: Database connection pooler
    - `/storage`: File storage

## Usage

### Starting and Stopping Services

- Start all services:

  ```bash
  docker compose up -d
  ```

- Stop all services:

  ```bash
  docker compose down
  ```

- View logs:
  ```bash
  docker compose logs -f
  ```

### Accessing Services

- **Supabase Studio**: `http://localhost:8000`
- **REST API**: `http://localhost:8000/rest/v1/`
- **GraphQL API**: `http://localhost:8000/graphql/v1/`
- **Authentication API**: `http://localhost:8000/auth/v1/`
- **Storage API**: `http://localhost:8000/storage/v1/`

### Connecting from Applications

Use the following configuration in your client applications:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "your-anon-key"; // Find this in your .env file

const supabase = createClient(supabaseUrl, supabaseKey);
```

## Troubleshooting

- **Services not starting**: Check Docker logs for specific error messages

  ```bash
  docker compose logs [service-name]
  ```

- **Database connection issues**: Verify PostgreSQL is running and accessible

  ```bash
  docker compose exec db psql -U postgres -c "\l"
  ```

- **API errors**: Check Kong gateway logs
  ```bash
  docker compose logs kong
  ```

## Updating

To update to the latest version of Supabase:

1. Pull the latest changes from the repository
2. Update the Docker images:
   ```bash
   docker compose pull
   ```
3. Restart the services:
   ```bash
   docker compose down
   docker compose up -d
   ```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase GitHub Repository](https://github.com/supabase/supabase)
- [Docker Documentation](https://docs.docker.com/)

## Security Considerations

- Always change default passwords in the `.env` file
- Use strong, unique passwords for all services
- Consider using a reverse proxy with SSL for production deployments
- Regularly update Docker images to get security patches
- Backup your database regularly

## License

Supabase is licensed under the Apache 2.0 License. See the [LICENSE](https://github.com/supabase/supabase/blob/master/LICENSE) file for details.

## Using Local Supabase with Self-Hosted Instance in Production

To connect your local Supabase instance to a self-hosted production environment, follow these steps:

1. **Configure Supabase Client in Next.js**:
   Update your Supabase client configuration in your Next.js application to point to your production URL and use the appropriate API keys.

   ```javascript
   import { createClient } from "@supabase/supabase-js";

   const supabaseUrl = "https://your-production-url.com";
   const supabaseKey = "your-production-anon-key"; // Ensure this key is set in your production environment

   const supabase = createClient(supabaseUrl, supabaseKey);
   ```

2. **Environment Variables**:
   Ensure that your production environment variables are set correctly in your hosting platform or server. This includes setting the `SUPABASE_URL` and `SUPABASE_KEY`.

3. **Deploying Next.js Application**:
   Deploy your Next.js application to your preferred hosting provider, ensuring that the environment variables are configured to connect to your self-hosted Supabase instance.

4. **Testing**:
   After deployment, test your application to ensure that it connects successfully to the Supabase instance and that all functionalities work as expected.

By following these steps, you can seamlessly integrate your local Supabase setup with a self-hosted production environment, ensuring a smooth transition from development to production.
