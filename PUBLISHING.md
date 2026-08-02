# Publishing to npm

`calendarkit-prov2` paketini npm'e yayınlama adımları.

## Hızlı yol

```bash
npm login
npm version patch
npm publish --access public
```

---

## Adım adım

### 1. Login

```bash
npm login
```

Aktif hesabı kontrol et:

```bash
npm whoami
```

`calendarkit-prov2` paketinin owner/maintainer hesabı olmalısın.  
`E404` alırsan yanlış hesaptasın veya yetkin yok:

```bash
npm logout
npm login
```

2FA açıksa:

```bash
npm publish --access public --otp=123456
```

### 2. Version bump (patch)

```bash
# 2.0.6 → 2.0.7
npm version patch

# yeni özellik → 2.1.0
npm version minor

# breaking change → 3.0.0
npm version major
```

### 3. Publish

```bash
npm publish --access public
```

`prepublishOnly` otomatik olarak `npm run build:lib` çalıştırır.

---

## Checklist

```bash
cd calendarkit-pro

npm login
npm whoami

git add .
git commit -m "feat: your change"
git push

npm version patch
npm publish --access public

git push
git push --tags
```

---

## Alternatif: GitHub Actions

Tag push veya manuel workflow:

```bash
git tag v2.0.7
git push origin v2.0.7
```

Repo secret: `NPM_TOKEN`  
Workflow: `.github/workflows/publish-npm.yml`

---

## Hata durumları

| Hata | Çözüm |
|---|---|
| `E404 Not Found - PUT ... calendarkit-prov2` | `npm whoami` → doğru hesapla `npm login` |
| `EOTP` / 2FA | `--otp=XXXXXX` ekle |
| `ENEEDAUTH` | `npm login` |
| Version already exists | tekrar `npm version patch` |

---

## Yayın sonrası

```bash
npm view calendarkit-prov2 version
```
