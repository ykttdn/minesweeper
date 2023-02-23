# Minesweeper

## 環境構築

まず `.env` を作成する：

```sh
cd /path/to/minesweeper
cp .env.example .env
```

続いて `.env` の以下の欄を変更する：

```
DB_HOST=mysql
```

次に Docker を用いて PHP のパッケージをインストールする：

```sh
docker run --rm --pull=always -v "$(pwd)":/opt -w /opt laravelsail/php81-composer:latest bash -c "composer install"
```

実行後 `vendor` という名前のディレクトリが生成される．
そこで次のコマンドで Docker コンテナを起動する：

```
docker login
./vendor/bin/sail up -d
```

すると `php`, `artisan`, `composer`, `npm` コマンドが使えるようになる：

```
./vendor/bin/sail php --version
./vendor/bin/sail artisan --version
./vendor/bin/sail composer --version
./vendor/bin/sail npm --version
```

最後に以下のコマンドを順に実行してサーバーを起動する：

```
./vendor/bin/sail php artisan key:generate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
./vendor/bin/sail php artisan migrate
```

[http:localhost](http:localhost) にアクセスすれば遊べるようになる．

これ以降は以下のコマンドだけでサーバーを起動できる：

```
./vendor/bin/sail up -d
./vendor/bin/sail npm run dev
```

終了するときは次のコマンドを実行する．

```
./vendor/bin/sail down
```
