FROM php:8.3-cli-alpine

# Install build tools and system deps for PHP extensions
# $PHPIZE_DEPS includes autoconf, g++, make (needed to compile extensions)
RUN apk add --no-cache git curl unzip libzip-dev oniguruma-dev libpq-dev $PHPIZE_DEPS \
    && docker-php-ext-install pdo_pgsql bcmath mbstring exif pcntl zip \
    && apk del $PHPIZE_DEPS

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www/html
