# 🎵 Moodify - Spotify Playlist Generator

En  spellistegenerator som skapar personliga Spotify-spellistor baserat på ditt humör och kontext. Byggd med Next.js 15, TypeScript och Spotify Web API. Projektet använder OAuth-autentisering för säker inloggning och skapar spellistor genom smart sökning baserad på användarens lyssningshistorik och valda stämning.

## 📑 Innehåll

- [📖 Om projektet](#-om-projektet)
- [✨ Funktioner](#-funktioner)
- [🛠 Teknologier](#-teknologier)
- [⚙️ Installation](#️-installation)
- [🚀 Användning](#-användning)
- [📂 Projektstruktur](#-projektstruktur)
- [📈 Arbetsflöde](#-arbetsflöde)
- [🤝 Bidra](#-bidra)
- [📚 Lärdomar](#-lärdomar)
- [📜 Licens](#-licens)

## 📖 Om projektet

Moodify är en webapplikation som gör det enkelt att skapa personliga Spotify-spellistor baserat på ditt humör och situation. Genom att integrera med Spotify Web API kan användare logga in med sitt Spotify-konto och få skräddarsydda spellistor som matchar deras mood ;)

Syftet med projektet är att:
- Förenkla processen att hitta ny musik som passar stämningen
- Kombinera personlig lyssningshistorik med intelligent sökning
- Skapa en smidig användarupplevelse för musikupptäckt
- Utforska modern webbutveckling med Next.js och externa API:er

## ✨ Funktioner

✅ **Spotify OAuth-inloggning** - Säker autentisering med Spotify-konto  
✅ **Stämningsbaserad spellistegenerering** - Välj mellan olika humör och kontexter  
✅ **Personlig musikanalys** - Använder din lyssningshistorik för bättre rekommendationer  
✅ **Smart sökning** - Kombinerar kontext och mood för relevanta låtar  
✅ **Automatisk spellisteskapande** - Skapar och sparar spellistor direkt till ditt Spotify-konto  
✅ **Responsiv design** - Fungerar perfekt på desktop och mobil  

## 🛠 Teknologier

- **Next.js 15** (App Router) - React-ramverk med server-side rendering
- **TypeScript** - Typsäker JavaScript för bättre utvecklarupplevelse
- **NextAuth.js** - Autentiseringslösning för OAuth med Spotify
- **Tailwind CSS** - Utility-first CSS-ramverk för snabb styling
- **Spotify Web API** - Integration för musikdata och spellistehantering
- **Lucide React** - Moderna ikoner för användargränssnittet

## ⚙️ Installation

```bash
# Klona repot
git clone https://github.com/ebobic/Moodify.git

# Gå in i projektmappen
cd Moodify

# Installera dependencies
npm install

# Skapa .env.local fil och lägg till dina Spotify API-nycklar
cp .env.example .env.local

# Starta utvecklingsservern
npm run dev
```


## 🚀 Användning

1. **Starta applikationen** - Öppna [http://localhost:3000](http://localhost:3000)
2. **Logga in** - Klicka på "Logga in med Spotify" och auktorisera applikationen
3. **Välj context och mood ** - Välj det humör eller den kontext som passar dig just nu
4. **Generera spellista** - Låt Moodify skapa en personlig spellista åt dig
5. **Lyssna** - Din nya spellista sparas automatiskt i ditt Spotify-konto

## 📂 Projektstruktur

```
Moodify/
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   │       └── route.ts            # NextAuth konfiguration
│   ├── components/
│   │   ├── ui/
│   │   │   └── LoginButton.tsx     # Återanvändbara UI-komponenter
│   │   ├── features/
│   │   │   ├── LandingPage.tsx     # Huvudsida-komponent
│   │   │   └── PlaylistGenerator.tsx # Spellistegenerering
│   │   └── layout/
│   │       ├── Footer.tsx          # Sidfot
│   │       └── Navbar.tsx          # Navigering
│   ├── create-playlist/
│   │   └── page.tsx                # Spellistegenerering-sida
│   ├── globals.css                 # Globala stilar
│   ├── layout.tsx                  # Huvudlayout
│   ├── page.tsx                    # Startsida
│   └── providers.tsx               # Context providers
├── types/
│   └── next-auth.d.ts             # TypeScript-definitioner
├── public/
│   ├── moodify-icon.svg           # Logotyp ikon
│   └── moodify-logo.svg           # Logotyp
├── next.config.ts                 # Next.js konfiguration
├── tsconfig.json                  # TypeScript konfiguration
└── package.json                   # Projektberoenden
```

## 📈 Arbetsflöde

- 🌱 **Feature branches** - Varje ny funktion utvecklas i egen branch
- 🔍 **Pull Requests** - Kodgranskning innan merge till main
- 🚀 **Continuous Integration** - Automatisk testning och deployment
- 📝 **Commit-konventioner** - Tydliga commit-meddelanden på svenska


## 🤝 Bidra

Vill du bidra till Moodify?

1. **Forka projektet**
2. **Skapa en feature-branch** (`git checkout -b feature/ny-funktion`)
3. **Commit dina ändringar** (`git commit -m 'Lade till ny funktion'`)
4. **Push till branchen** (`git push origin feature/ny-funktion`)
5. **Skicka en Pull Request**

## 📚 Lärdomar

Under utvecklingen av Moodify har jag fått öva på:

- **Next.js App Router** - Skillnaden mellan Server och Client Components
- **OAuth-flöden** - Säker autentisering med externa tjänster
- **API-integration** - Hantering av externa API:er och felhantering
- **TypeScript** - Typsäkerhet i React-applikationer
- **Responsiv design** - Modern CSS med Tailwind
- **Versionskontroll** - Agila arbetsmetoder med Git och GitHub

##  Licens

Detta projekt är utvecklat i utbildningssyfte och är inte avsett för kommersiell användning

---

**Utvecklat med ❤️ och mycket kaffe ☕**
