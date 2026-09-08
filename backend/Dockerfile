FROM php:8.3-cli

WORKDIR /var/www

RUN docker-php-ext-install pdo_mysql

COPY . .

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN compose install
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]

