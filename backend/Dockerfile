# ビルドステージ
FROM node:18.17.0 as builder

# 作業ディレクトリを設定
WORKDIR /api

# 依存関係のファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# プロジェクトファイルをコピー
COPY . .

# Prismaの生成とビルドプロセス
RUN npx prisma generate && npm run build

# 本番ステージ
FROM node:18.17.0

# Python、pip、FLAC、ffmpegのインストール
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv
# 仮想環境の準備
RUN python3 -m venv /opt/venv

# 作業ディレクトリを設定
WORKDIR /api

# ビルドステージからビルドされたファイルをコピー
COPY --from=builder /api/dist ./dist
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/prisma ./prisma

# 仮想環境を有効化し、必要なパッケージをインストール
COPY requirements.txt /opt/venv/
RUN . /opt/venv/bin/activate && pip install -r /opt/venv/requirements.txt

ENV PYTHON_PATH=/opt/venv/bin/python3
ENV SCRIPT_PATH=/api/src/lib/speech_recognition/BERT.py

# ポート8000を公開
EXPOSE 8000

# ファイルディスクリプタの制限を増やす
RUN echo '* soft nofile 65535' >> /etc/security/limits.conf \
    && echo '* hard nofile 65535' >> /etc/security/limits.conf


# アプリケーションの起動
CMD ["node", "dist/src/main"]
