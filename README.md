# Immich TW

這是修改過的 [Immich](https://github.com/immich-app/immich) 伺服器映像檔，修復臺灣國名顯示問題。

## 問題

Immich 使用 [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries) 這個套件，該套件在多種語言（包括英文）中錯誤地將臺灣標示為「Province of China」。

根據開發團隊的[回應](https://github.com/immich-app/immich/issues/10994#issuecomment-2281604187)，這個問題看起來不會在上游版本中修復，因此本專案提供補丁過的映像檔。

## 使用方式

將原本的 Immich 伺服器映像檔替換為：

```yaml
# docker-compose.yml
services:
    immich-server:
        image: ghcr.io/simbafs/immich-tw:latest
```

重新部署後，前往「管理」>「任務佇列」>「擷取中繼資料」，點選「全部執行」重新處理所有照片。國名就會正確顯示為「臺灣」。

## Docker 映像檔

| 標籤       | 說明                     |
| ---------- | ------------------------ |
| `latest`   | 最新穩定版               |
| `release`  | 同步上游 release 標籤    |
| `v{x.y.z}` | 指定上游版本（不一定有） |

## 授權

AGPLv3 授權，詳見 [LICENSE](LICENSE) 檔案。
