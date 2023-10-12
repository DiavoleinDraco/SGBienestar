import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import  './mensajes.css'
import ComposeMessage from '../../components/componentedeprueba/componentedeprueba';
import Buttons from '../../components/Buttons/Buttons';

export default function Mensajes(){
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  }
  const handleSendMessage = (recipient, message) => {
    // Aquí puedes enviar el mensaje o realizar cualquier otra lógica
    console.log(`Enviando mensaje a ${recipient}: ${message}`);
  };

    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
           <Menu/>
            <Container>
            <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gmail-clone</title>
    <link rel="icon" type="image/x-icon" href="./img/logo-64.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/media.css" />
    <script src="https://unpkg.com/ionicons@latest/dist/ionicons.js"></script>
    <script defer src="./script.js"></script>
  </head>
  <body>
    <section>
      <header class="header">
        <div class="left-area flex">
          <div class="menu hover">
            <span class="icon"></span>
            <span class="icon"></span>
            <span class="icon"></span>
          </div>
          <img src="./img/logo-24.png" alt="logo" />
          <span class="mail-text">Gmail</span>
        </div>
        <div class="middle-area">
          <div class="search">
            <ion-icon name="search-outline" class="hover"></ion-icon>
            <input type="search" placeholder="Search mail" />
          </div>
        </div>
        <div class="right-area flex">
          <ion-icon name="help-circle-outline" class="hover"></ion-icon>
          <ion-icon name="settings-outline" class="hover"></ion-icon>
          <ion-icon name="apps" class="hover"></ion-icon>
          <img src="./img/man.jpg" alt="user-photo" />
        </div>
      </header>
      <nav>
        <div class="nav_container">
          <div class="nav_top">
          
            <button onClick={handleComposeClick}><ion-icon name="pencil"></ion-icon>Compose</button>
      {isComposeOpen && (
        <ComposeMessage
          onClose={() => setIsComposeOpen(false)}
          onSendMessage={handleSendMessage}
        />
      )}
          </div>
          <div class="nav_middle">
            <ul>
              <li>
                <a href="#">
                  <ion-icon name="image-outline"></ion-icon>
                  Inbox
                </a>
                <span>4</span>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="star-outline"></ion-icon>
                  Starred
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="time-outline"></ion-icon>
                  Snoozed
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="send-outline"></ion-icon>
                  Sent
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="document-outline"></ion-icon>
                  Draft
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="chevron-down-outline"></ion-icon>
                  More
                </a>
              </li>
            </ul>
          </div>
          <div class="nav_bottom">
            <span>Labels</span>
            <ion-icon name="add" class="hover"></ion-icon>
          </div>
        </div>
      </nav>
      <main class="main_content">
        <div class="top">
          <div class="left">
            <div class="check">
              <img src="./img/checkbox.png" alt="" />
              <span> <ion-icon name="checkmark"></ion-icon> </span>
              <ion-icon name="caret-down-outline"></ion-icon>
            </div>
            <ion-icon
              name="reload-outline"
              class="hover content-icon"
            ></ion-icon>
            <ion-icon
              name="ellipsis-vertical"
              class="hover content-icon"
            ></ion-icon>
          </div>
          <div class="right">
            <div class="sort_numbers hover">1-50 of 94</div>
            <ion-icon
              name="chevron-back-outline"
              class="chev content-icon"
            ></ion-icon>
            <ion-icon
              name="chevron-forward-outline"
              class="hover content-icon"
            ></ion-icon>
          </div>
        </div>
        <div class="messages_area">
         
        </div>
      </main>
      <aside>
        <div class="aside_icons">
          <img src="./img/calendar-48.png" alt="" class="hover" />
          <img src="./img/keep-48.png" alt="" class="hover" />
          <img src="./img/task-48.png" alt="" class="hover" />
          <img src="./img/account-48.png" alt="" class="hover" />
          <span></span>
          <ion-icon name="add" class="hover"></ion-icon>

          <div>
            <ion-icon name="chevron-forward-outline" class="hover"></ion-icon>
          </div>
        </div>
      </aside>
    </section>
  </body>
</html>

    </Container>
        </Box>
        
    )
}