# Blog App

```bash
# yarn 
yarn create vite .

# Select a framework
React

# Select a variant
Javascript + SWC
```

- Vite Boilerplate Temizliği
  - main.jsx'deki StrictMode'u kaldır.
  - App.jsx'deki fazlalıkları temizle.
    - Bu dosya zaten kısa süre sonra Router’a devredecek.

- src içinden şunları silebilirsin:
  - ❌ assets/react.svg
  - ❌ assets/vite.svg
  - ❌ App.css (kullanmıyorsak)
  - ❌ index.css içindeki Vite demo stilleri

- index.css → sıfırdan başlat
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

- Proje Şu An Ne Durumda?
  - 🚫 Router yok
  - 🚫 Redux yok
  - 🚫 MUI yok
  - 🚫 Firebase yok
  - Ama:
  - ✅ Temiz
  - ✅ Kontrol sende
  - ✅ Gerektikçe ekleyeceğiz




## Adım adım (kopyala-yapıştır için hazır)

1. Yeni React projesi (Vite) oluştur

Projeyi kur:
```bash
yarn create vite . --template react
```


2. Proje klasörüne gir

```bash
cd react-project-terminal-push-github
```



3. (İsteğe bağlı) Bağımlılıkları kur

```bash
npm install
yarn start
```


4. Git başlat
```bash
git init
```

5. Branch Adını main yapalım (Best Practice)
```bash
git branch -M main
```

6. Git Durum Kontrolü
```bash
git status

# Bunu göreceksin..
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)

```


7. Tüm dosyaları git’e ekle
```bash
git add .
```


8. İlk commit yap
```bash
git commit -m "Initial commit"

# or
git commit -m "chore: initial project setup with Vite + React"
```


9. GitHub’da yeni repo oluştur

  - GitHub → New repository
  - Repo adı: react-project-terminal-push-github (veya tercih ettiğin başka bir ad)
  - README ekleme (boş repo olacak)
  - Oluşan repo URL’sini kopyala: https://github.com/KullaniciAdi/react-project-terminal-push-github.git


10. Remote (origin) ekle

```bash
git remote add origin https://github.com/Umit8098/react-project-terminal-push-github.git
```


11. Branch’i main yap ve upstream ile push et

```bash
git branch -M main
git push -u origin main
```


12. (Kontrol) Remoteları ve durumunu gör

```bash
git remote -v
git status
```