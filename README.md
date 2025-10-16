# Polstory
Aplikacja internetowa przedstawiająca poszczególne wojny Polski w latach 1400–1500. Projekt wizualny został stworzony z wykorzystaniem <b>Figmy</b>. Frontend powstał w oparciu o bibliotekę <b>React</b>, natomiast mapa oraz wszystkie działania z nią związane zostały zaimplementowane przy użyciu biblioteki <b>Leaflet</b>. Za zawartość strony i wszystkie treści znajdujące się w aplikacji odpowiada <b>Strapi CMS</b>. Pierwotnym założeniem projektu było stworzenie aplikacji, która pozwoli zobaczyć na mapie miejsca bitew, jakie Polska, a później Rzeczpospolita Obojga Narodów, toczyła w latach 1400–1600. Finalnie zdecydowałem się jednak na koncepcję, w której prezentowane są całe wojny wraz z powiązanymi wydarzeniami i bitwami. Zakres czasowy został ostatecznie zawężony do lat 1400–1500, co pozwoliło skupić się na dopracowaniu szczegółów i jakości prezentowanych danych.

## 🚀 Funkcjonalności
- 🗺️ Mapy konfliktów – wizualizacje granic państw biorących udział w konflikcie.

- 📖 Szczegółowe opisy – każdy konflikt zkłada się z listy pomniejszych wydarzeń, które są zaznaczone na mapie i opisane.

- 🖼️ Multimedia – ilustracje, mapy i portrety władców zintegrowane przez Strapi CMS.

- ⚙️ Headless CMS (Strapi) – pełna kontrola nad treścią bez potrzeby edytowania kodu aplikacji.

- 📱 Responsywność – aplikacja dostosowuje się do ekranów desktopowych, tabletów i urządzeń mobilnych.

## Opis procesu tworzenia polstory
Przed rozpoczęciem właściwego tworzenia aplikacji przygotowałem projekt wizualny w Figmie. Była to dla mnie pierwsza okazja, aby w większym stopniu rozwinąć umiejętności z zakresu UI/UX designu. Z wykorzystaniem samodzielnie stworzonych palet kolorów, komponentów oraz prototypów zaprojektowałem widoki, które później posłużyły jako podstawa do implementacji rzeczywistej aplikacji.
<p align="center">
  <img alt="Main view 1700w" src="https://github.com/user-attachments/assets/e658f980-f1a5-47e2-bf61-52c2f638368f" width="80%">
</p>

<p>
  Pierwotnie zaprojektowany wygląd mapy. Z finalnej wersji w dolnych rogach mapy zniknęły zdjęcia, 
  zdecydowałem również na niedodawanie strzałek, które pierwotnie miały wskazywać trasę przemarszu armii. 
  A to ze względu na utratę czytelności mapy w przypadku dużej liczby wydarzeń. Na ostatecznej mapie pojawiły się także granice państw.
</p>

 <p align="center">
  <img alt="Battle detail view w1200" src="https://github.com/user-attachments/assets/976aba8e-8936-4580-86ce-8b66677705a0" />
</p>

<p>
  Pierwotnie zaprojektowany opis wydarzenia, tutaj w finalnej wersji zdecydowałem się jedynie na niewielkie zmiany stylistyczne.
</p>

Największym wyzwaniem, jakie napotkałem w procesie tworzenia aplikacji, było zaprojektowanie <b>struktury danych</b> w Strapi w taki sposób, abym jako administrator mógł łatwo dodawać kolejne wojny i powiązane z nimi wydarzenia, bez konieczności modyfikowania kodu aplikacji.

Jednym z najciekawszych rozwiązań, jakie wdrożyłem, było <b>generowanie map</b> poszczególnych państw.
Frontend pobiera ze Strapi <b>listę koordynatów</b>, na podstawie których tworzony jest kształt przypominający dany kraj.
Zależało mi, aby dane zawierające koordynaty były możliwie jak najbardziej uproszczone, dlatego mapy w aplikacji nie są idealnym odwzorowaniem historycznych granic.

Podczas prób dokładniejszego odtworzenia granic korzystałem z narzędzia <b>QGIS</b>. Okazało się jednak, że wygenerowane pliki zawierały nawet od <b>180 000</b> do <b>500 000</b> punktów koordynatów w zależności od rozmiaru państwa.
Użycie tak obszernego zbioru danych powodowało problemy ze stabilnością aplikacji oraz negatywnie wpływało na wydajność i doświadczenie użytkownika.
Z tego względu zdecydowałem się na zastosowanie uproszczonych map, które – choć mniej dokładne – w przybliżeniu ukazują granice średniowiecznych państw.

Ostatecznie frontend pobiera ze Strapi listę wojen, które są powiązane z:

- wydarzeniami odbywającymi się w trakcie danej wojny,

- państwami biorącymi udział w konflikcie.

Na podstawie tych danych generowane są również markery, które po kliknięciu wyświetlają szczegółowy opis wydarzenia. Każdy marker ma przypisaną szerokość oraz wysokość geograficzną, dzięki temu wstawiany jest w odpowiednie miejsce na mapie konfliktu.
W aplikacji szeroko wykorzystywane są React Providery, dzięki czemu każdy komponent, który tego wymaga, ma dostęp do danych pobranych ze Strapi.

Lista wszystkich danych które są w pełni edytowalne za pomocą panelu administratora:

- Nazwa wojny
- Czas trwania wojny
- Domyślne przybliżenie mapy
- Elementy legendy wraz z opisem
- Domyślne wycentrowanie
- Źródła naukowe wykorzystane do opisania wojny
- <b>Lista państw powiązanych z wojną</b> (struktura strapi):
  - Nazwa państwa
  - Lista koordynatów służąca do utworzenia kraju na mapie
  - Kolor ma mapie
  - Herb państwa
  - Flaga państwa
  - Informacje o sojusznikach w danej wojnie
  - Miejsce w którym wyświetla się herb państwa
- <b>Lista wydarzeń powiązanych z wojną</b> (struktura strapi):
  - Lista zdjęć i ich opisy
  - Kolejność danego wydarzenia
  - Pozycja na mapie
  - Opis wydarzenia
  - Typ markeru na mapie 
  - Nazwe wydarzenia
  - Opis wstępny
  - Rozmiar markera
  
  
<img width="1916" height="954" alt="image" src="https://github.com/user-attachments/assets/525a07ed-1cee-44a2-930e-d3d70bd68c73" />
<p>Widok ukazująy obszar działań wojennych z rozwiniętym paskiem nawigacji.</p>
<img width="1918" height="951" alt="image" src="https://github.com/user-attachments/assets/cb83e009-28ea-4669-804c-e099fc36ccc5" />
<p>Poprzedni widok wzbogacony o wysuniętą Legendę oraz krótki opis wstępny, który wyświetli się w przypadku najechania kursorem na Marker wydarzenia.</p>
<img width="1922" height="951" alt="image" src="https://github.com/user-attachments/assets/f763aa06-e91c-443b-b658-cd0fccfa0b56" />
<p>Popup zawierający opis wydarzenia, okno to widoczne jest po kliknięciu ma Marker wydarzenia.</p>




## 📅 Dalsze plany rozbudowy aplikacji
📄 Paginacja wojen w nawigacji – obecnie dostępna jest tylko jedna wojna ze względu na czasochłonność przygotowywania i wyszukiwania materiałów. W przyszłych aktualizacjach planuję wprowadzić paginację, aby użytkownik mógł szybko przeglądać wszystkie konflikty bez długiego oczekiwania na załadowanie danych.

💡 System podpowiedzi – mechanizm sugerujący, które wydarzenie na mapie wojny warto wybrać, bazując na wcześniejszych wyborach użytkownika.

🗺️ Udoskonalenie mapy – naniesienie najważniejszych rzek, przeszkód terenowych i innych elementów geograficznych, aby lepiej zobrazować przebieg konfliktów.

🎯 Dodanie filtru, który pozwoli wyświetlać jedynie zaznaczone elementy np. jedynie bitwy wygrane przez Polskę.
  




# <p align="center">Odwiedź aplikację kilkając napis ⬇️⬇️⬇️</p>
<h1 align="center"><a href="https://polstory.pl/">Polstory</a></h1>
