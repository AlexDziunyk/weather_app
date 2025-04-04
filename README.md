# Weather App
### React + Typescript + Mantine + Vitest + OpenWeatherMap API <br/>
This is a small weather application that shows weather information about the city you entered in the input. <br/>
This application caches the data. When you choose the city it saves all necessary information to the localStorage. It can be saved for 5 minutes. When you choose the city, the application checks if data about this city is cached. If it's true it deletes all expired data and shows you weather info. <br/>
Mantine library was used for simple and minimalistic design. <br/>
Vitest was used for testing. There are tests for cache functionality (get, set, and delete) and components (error display, correct info display).

## How to launch this application?
1. Type ```npm install``` in the root folder to install all dependencies.
2. Create ```.env``` file in the root folder that looks like this ```VITE_WEATHER_API={YOUR_API_KEY}```. You need to use your own OpenWeatherMap API key to make this app work.
3. Type ```npm run dev``` in the root folder to launch the application on ```http://localhost:5173/```.
   
## How to test this application?
1. To run the tests you need to type ```npm run test```.
2. After this you'll see the result of the tests.
   
## How to use this application?
  1. Type the city name into the input.
   
  ![Screenshot_134](https://github.com/user-attachments/assets/ed292278-664b-4fd7-b37c-553623fb76e9)
  
  2. This input is Autocomplete, so while typing you can see the options OpenWeatherMap API offers you.
  3. Click on the option you like.
  4. After selection the option you will see weather information about the city.
   
  ![Screenshot_136](https://github.com/user-attachments/assets/9e3a71fb-f674-45e9-b382-e2323b0ef9cc)
  
  5. If you select this city one more time, it will load instantly because its information was cached. After 5 minutes this info will be erased.
