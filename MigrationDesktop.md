# Migration Mobile - Desktop 

## CSS

### App.css - I might need to add: 

```
html, body, #root {
  height: 100%;
}

 body {
   min-height: 100lvh;}
```

### Agenda.module.css, Home.module.css, Friends.module.css
Only the ones on the dashboard (the modals can keep their max-width)? Or the modals are also bigger?

```

desktop
.page {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0x;
}

mobile 
.page {
  padding: 0 16px; /*! ?????? /*! 
}

desktop
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  gap: 40px;
  margin-top: 28px;
  marging-left: 32px; /*! Agenda: no padding-left/*! 
}

mobile 
.container {
  gap: 24px;
  padding-top: 8px;
  marging-top: 0px;
  padding-left: 0px;
  max-width: 400px;
  margin-bottom: 60px; /*! Take out when desktop version */
}

desktop
.header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    display: flex;
    padding-left: 32px;
}

mobile
.header {
     padding-left: 0px;
}
```

### Content inside .container, changes depending on the page: 

### Home.module.css

```
desktop
.listCards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /*check*/
    padding: 20px 32px;
    gap: 8px;
    width: 100%;
    overflow-y: auto;
    background: linear-gradient(153deg, rgba(105, 114, 118, 0.03) 6.31%, rgba(105, 114, 118, 0.06) 82.97%);
}

mobile
.listCards {
 display: flex;
   justify-content: center;
    align-items: center;
    flex-direction: column;
    background: none;
}

.card{
    border-radius: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
    min-height: 140px;
    padding: 16px;
    display: flex;

    min-width: 320px; /*check*/
}

mobile
.card{
    width: 100%;
    min-width: 300px;
 
}
```

### App.css 
```
desktop
main {
  margin-top: 112px;    /* clears the header */
  margin-left: 120px;   /* clears the navbar — match navbar width */
}

mobile
main {
  margin-top: 0px;    
  margin-left: 0px;   
}
```

```
/* ---------- Navigation Bar ---------- */
desktop
.navBar {
  display: flex;
  flex-direction: column;
  width: 160px;
  padding: 28px 32px;
  justify-content: flex-start;
  gap: 72px;
  align-items: center;
  flex-wrap: wrap;
  background: white;
height: 100%;
  position: fixed;
  top: 112px;
  left:0px;
  border-right: 1px solid #E6EEF2;
}

mobile
.navBar {
  display: flex;
  flex-direction: row;
  width: calc(100% - 32px);
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 28px;
  background: #065981;
  position: sticky;
  bottom: 20px;
  margin: 0 auto;
  max-width: 400px;
}

.contNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%
    padding: 12px 0px;
    border-radius: 20px;

}

contNav:hover {
  background: rgba(255, 255, 255, 0.20);
}

.contNav p {
    color: #073B54;
font-family: Poppins;
font-size: 12px;
font-weight: 600;
}


mobile
contNav {
  width: 56px;
  height: 56px;
  border-radius: 100px;
}

contNav:hover {
box-shadow: 5px 7px 8px 0 rgba(152, 152, 152, 0.12);
}


~~.navBar a,
.navBar button {
  width: 56px;
  height: 56px;
}~~


~~.navBar a:hover,
.navBar button:hover {
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.20);
}~~

```
```
/* ---------- Header ---------- */

desktop
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

margin-top: 0px;
  padding: 0px 32px;
  height: 112px;
  width: 100%;

   border-bottom: 1px solid #E6EEF2;
}

mobile
.header {

margin-top: 60px;
  padding: 20px 0;
  max-width: 400px;
  width: calc(100% - 32px);
  height: fit-content;

  border-bottom: none;
}


desktop
.logo {
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.28px;
  background: linear-gradient(to right, #acc2ff, #c5e9fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

mobile
.logo {
  font-size: 28px;
}
```

##Buttons

btn-1, btn-2, btn-3 because they are also on desktop version
btn-icon is not on desktop version but it doesn't show up

### App.css

add: btn-add btn-search
```
.btn-add {
display: flex;
flex-direction: row;
height: 38px;
width: 152px
align-items: center;
justify-content: center;
border-radius: 10px;
background: #065981;
color: #FFF;
font-size: 12px;
gap: 8px;
}

.btn-add:hover {
  opacity: 0.85;
}

.search-field {
height: 38px;
width: 320px
border-radius: 10px;
}

/* btn-icon for mobile*/
.btn-icon {
  background: var(--light-gray);
  height: 48px;
  width: 48px;
  border-radius: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.btn-icon:hover {
  background: var(--light-medium);
}

```
### AddEvent.module.css

```
.btn {
  width: 100%;
border-radius: 10px;
background: #065981;
color: #FFF;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.85;
}

mobile
.btn {
  background-color: #000000;
  color: #ffffff;
  border-radius: 20px;
}

```
### Agenda.module.css

```
.btn {
  width: 100%;
border-radius: 10px;
background: #065981;
color: #FFF;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.85;
}

mobile
.btn {
  background-color: #000000;
  color: #ffffff;
  border-radius: 20px;
}

```

# JSX

## For opening component

```
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}
```
```
export const Home = () => {
    const isDesktop = useIsDesktop(); 
    .......

{isDesktop 
                                ? <img src="/icons/search.png" alt="Search event" />
                                : "Search event"
                            }}
```

### Home.jsx

container > header: 
two button icons replaced by search and long blue button

```
   <div className={styles.buttons}>
   {isDesktop ?  <input className="search-field" type="text" value={search} placeholder="   Search event"
                        onChange={(e) => setSearch(e.target.value)} /> :
          <button className="btn-icon" onClick={() => setShowSearch(true)}> <img src="/icons/search.png" alt="Search event" /> </button>}
   
    {isDesktop ? <button onClick={() => setShowModal(true)} className="btn-search"> <img src="/icons/plus.png" alt="Add event"/> Add new event</button>  : <NavLink to="/add" className="btn-icon"><img src="/icons/plus.png" alt="Add event" /></NavLink>}
                    
                    </div>
```

### Friends.jsx

```
   <div className={styles.buttons}>
   {isDesktop ?  <input className="search-field" type="text" value={search} placeholder="   Search friend"
                        onChange={(e) => setSearch(e.target.value)} /> :
          <button className="btn-icon" onClick={()=>{setShowSearch(true)}}> <img src="/icons/search.png" alt="Search event" /> </button>}
   
   <NavLink to='/users' className={isDesktop ? 'btn-search' : 'btn-icon'}>
  <img src="/icons/plus.png" alt="Add friend" />
  {isDesktop && <p>Add new friend</p>}
</NavLink>

                    
                    </div>
```

### Header.jsx
add
```
<div className={style.divWelcome}>
 {isDesktop && <p>Welcome, {user.name} </p> }
<div class=btn-icon> </div>
 </div>
```

### NavBar.jsx

```
   <div className="navBar">
  <NavLink className='contNav' to="/" className="nav-home">
  <img src="/icons/home.png" alt="Home" />
  {isDesktop && <span>Home</span>}
</NavLink>
            <NavLink className='contNav' to="/friends"><img src="/icons/friends.png" alt="Friends" /> {isDesktop && <p>Friends</p>} </NavLink>
            <NavLink className='contNav' to="/agenda"><img src="/icons/agenda.png" alt="Agenda" />{isDesktop && <p>Agenda</p>}  </NavLink>
            <NavLink className='contNav' to=""><img src="/icons/settings.png" alt="Settings" />{isDesktop && <p>Settings</p>} </NavLink>
            
            <button className='contNav' onClick={handleLogOut}><img src="/icons/logout.png" alt="Log out">{isDesktop && <p>Log out</p>} </button>

        </div>
```

# MODALS: JSX CSS

## Modal 1: Add Event

### 1) Home.jsx 
*Import AddEvent

```
const [showModal, setShowModal] = useState(false)
```

```
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}

```
   {isDesktop ? <button onClick={() => setShowModal(true)} className="btn-search"> <img src="/icons/plus.png" alt="Add event"/> Add new event</button> : <NavLink to="/add" className="btn-icon"><img src="/icons/plus.png" alt="Add event" /></NavLink>}
```


```
              <EventList onNmbEvents={setNmbEvents} search={search} />
            </div>
           {showModal && <AddEvent onClose={()=> setShowModal(false)}/>}
        </div>
```
### 2) Home.module.css

desktop
.page {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0x;

  position: relative;
}

mobile 
.page {
  padding: 0 16px; /*! ?????? /*! 

  position: static;
}

### 3) AddEvent.module.css

```
/* ---------- Layout ---------- */
desktop
.page {
   position: fixed;
  top: 0;
  left: 0;
  background: rgba(247, 250, 250, 0.80);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
 width: 100%;
  z-index: 999;
}

mobile
.page {
  align-items: flex-start;
  position: relative;
  background-color: #ffffff;
  padding: 0 16px;

   position: static;
    top: unset;
    left: unset;
}

desktop
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px; 
  max-width: 600px;
  padding: 20px;
  z-index: 1000;

   position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

mobile
.container {
  padding: 8px 0 0 0;
   max-width: 100%

      position: static;
    top: unset;
    left: unset;
    transform: none;
}
```
Add
```
.closeIcon{
  height: 14px;
  width: auto;
  position: absolute;
  right: 8px;
}
```


### 4) AddEvent.jsx
```
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}
```
```
export const AddEvent = ({onClose}) => {
    const isDesktop = useIsDesktop(); 
    .......
```

```
  <div className={styles.title}>
                        <h1>Add Event</h1>
{isDesktop ??            <button onClick={onClose}><img className={styles.closeicon}src="/icons/close.svg" alt="Close" /></button>  
                        <NavLink to="/"> <img className={styles.prevArrow} src="/icons/prev.png" alt="Previous" /> </NavLink> }
                    </div>
```


## Modal 2: Event Details

Make the subcomponent of eventList a prop
Make the className of eventList a prop

### 1) EventDetail.jsx
Add containerDesktop as container parent of eventDetails.
Add ListEvents after eventDetails

```
  <div className={styles.containerDesktop}>
    {/* Event Info */}
    <div className={styles.eventDetails}>...</div>

   {isDesktop && <div className={styles.listEvents}>
    <h3>Other events<h3/>
     <EventList 
            search={search} 
            onNmbEvents={handleCount} 
            CardComponent={EventCardSmall} 
            className={styles.sideListCards} 
        />
    </div>}
```

### 2) EventList.jsx

```
export const EventList = ({ onNmbEvents, search, CardComponent, className }) => {
  ...

  return (
        <div className={className}>
            {allEvents.map((event, index) => (
                /* 
                   Render the component passed via props. 
                   Note: React components in props must start with a Capital Letter 
                */
                <CardComponent 
                    key={event._id} 
                    event={event} 
                    index={index} 
                    currentUserId={data.userId} 
                />
            ))}
        </div>
    )

```


### 3) Adjust Home.jsx
```
import { EventList } from './EventList'
import { EventCard } from './EventCard' 

const Home = () => {
    return (
        <EventList 
            search={search} 
            onNmbEvents={handleCount} 
            CardComponent={EventCard} 
            className={styles.listCards} 
        />
    )
}
```
### 4) Create EventCardSmall.jsx
```
import styles from '../Home.module.css'
import { useNavigate } from 'react-router-dom';

export const EventCardSmall = ({ event, index, currentUserId }) => {

    const navigate = useNavigate();


const attendees = [
    event.createdBy,
    ...event.interested
].filter(user => user._id.toString() !== currentUserId.toString());

const count = attendees.length;

    return (
        <div className={styles.card2} >

            <div className={styles.firstLine}>
                <div>
                    <p className={`${styles.tag2} ${index % 5 === 0 ? styles.color0 :
            index % 5 === 1 ? styles.color1 :
                index % 5 === 2 ? styles.color2 :
                    index % 5 === 3 ? styles.color3 :
                        styles.color4
            }`}
            }>{event.type}</p>
                    <p>{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                </div>
                {/* <button ><img className={styles.iconXs} src="/icons/down.png" alt="Open" /></button> */}
            </div>
            <h3>{event.name} @{event.at}</h3>
            <div className={styles.thirdLine}>
                <div className={styles.interested}>
                    <p className={`${styles.nmbInterested2} ${index % 5 === 0 ? styles.border0 :
            index % 5 === 1 ? styles.border1 :
                index % 5 === 2 ? styles.border2 :
                    index % 5 === 3 ? styles.border3 :
                        styles.border4
            }`}>+{attendees.length}</p>
                  
                        {count === 0 && (
                                <p>No one yet</p>
                            )}

                            {count > 0 && count <= 2 && (
                                <div>
                                    <p>
                                        {attendees.map(user => user.name).join(', ')} will go</p>
                                </div>
                            )}

                            {count > 2 && (
                                <div>
                                    <p>
                                        {attendees.slice(0, 2).map(user => user.name).join(', ')} and {count - 2} more will go
                                    </p>
                                </div>
                            )}

        </div>
    )
}
```

### css
#### Home.module.css
```
.card2 {
    display: flex;
width: 100%;
padding: 16px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;
border-radius: 32px;
}

.card2:hover {
box-shadow: 5px 7px 8px 0 rgba(152, 152, 152, 0.12);
}

.tag2 {
    color: black;
    border-radius: 200px;
padding: 1px 8px;
}

.nmbInterested2 {
    color: black;
    border-radius: 50px;
width: 28px;
height: 28px;
font-size: 8px;
  display: flex;
    align-items: center;
    justify-content: center;
}


.border0 {
border: 1px solid #FBE9CC;
}

.border1 {
  border: 1px solid #EAF1F3;
}

.border2 {
    border: 1px solid #ACC2FF;
}

.border3 {
   border: 1px solid #DCD5FB;
}

.border4 {
  border: 1px solid #C5E9FA;
}

.sideListCards {
 display: flex;
    flex-direction: column;
    gap: 8px;
     align-items: flex-start;
    justify-content: center;
    width: 100%;
}

.listEvents {
  display: flex;
   display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    justify-content: center;
    width: 400px;
    
}

.containerDesktop {
   display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 40px;
}

```

### Event.module.css

/* ---------- Event Info ---------- */
.eventDetails {
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 100% /* Addddddddd just in case*/
}


## Modal 3: Event Details + send to

### css
### Event.module.css

.modalContainer {
    max-width: 400px;
    width: 100vw;
    ~~max-width: 440px; /* Take out */~~
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    display: flex;
    flex-direction: column;
    margin-bottom: 160px;
    gap: 20px;
    ~~width: 96%; ~~
    width: 480px;
    padding: 20px;
    border-radius: 32px;
    background-color: rgb(255, 255, 255);
    max-height: 640px;
}

## Modal 5: Agenda EventDetails

Class carrousel as props, carrousel for Agenda.jsx, y carrouselVertical for EventApiDetail.jsx
RecCard as props, RecCard for Agenda.jsx, y RecCardSide for EventApiDetail.jsx

### 1) EventApiDetail.jsx
Add containerDesktop as container parent of eventDetails.

```
import { Rec1 } from './components/Rec1'
import { RecaCardSide } from './RecCardSide' 
```
```
  <div className={styles.containerDesktop}>
      {/* Event Info */}
       <div className={styles.eventDetails}>...</div>
            {/* Correct eventDetails and closing it at the end of the divs!! */}

      {isDesktop && <div className={styles.listEvents}> <Rec1 className={styles.carrouselVertical} CardComponent={RecCardSide} }/>
   </div>}
```


### 2) Rec1.jsx
```
export const Rec1 = ({className, CardComponent}) => {
```
```
<div className={styles.className}> {/* change here */}
  <div className={styles.eventList}>
                {data.map((event, index) => (
                <CardComponent key={index} index={index} event={event} />
          ))}
```

### 3) Agenda.jsx
```
import { RecaCard } from './RecCard' 
```
```
   <div className={styles.content}>
      <Rec3 />
      <Rec1 className={styles.carrousel} CardComponent={RecCard} /> {/* change here */}
      <Rec4 />  
       <Rec2 />
```

### 4) Create RecCardSide.jsx
```
import styles from '../Agenda.module.css'
import axios from 'axios'
import { useState } from 'react';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

export const RecCard = ({ index, event }) => {

    const navigate = useNavigate();

    return (
        <div className={styles.eventCardSide}>
<div>
            {(event?.date_end === event?.date_start) ? <p> {new Date(event.date_start).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            })}</p> :
                <p>
                    {new Date(event.date_start).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    })} - {new Date(event.date_end).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    })}
                </p>}


            <h3>{event.place?.translations?.en?.name} presents: {event.translations?.en?.name}</h3>
</div>

                <img src={(Array.isArray(event.media) ? event.media?.[0]?.link : event.media?.link) || 'https://dummyimage.com/243x326/ccd6d9/266582.png&text=+'} alt={event.translations?.en?.name} />

        </div>
    )
}

```
### css
### Agenda.module.css

```
.containerDesktop {
   display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 40px;
}

.eventCardSide {
    display: flex;
width: 100%;
padding: 16px;
flex-direction: row;
justify-content: space-between;
align-items: center;
border-radius: 32px;
}

.eventCardSide img {
    object-fit: cover;
    width: 64.4px;
    height: 96.6px;
}

.eventCardSide:hover {
box-shadow: 5px 7px 8px 0 rgba(152, 152, 152, 0.12);
}

.listEvents {
  display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 400px;
    
}
```

## Modal 6: Agenda Add Event

### EventApiDetail.jsx

*Import AgendaAddEvent

```
const [showModal, setShowModal] = useState(false)
```

```
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}

```
```
 { isDesktop ? <button className={styles.btnShare} onClick={() => setShowModal(true)} className="btn-search">> Add event </button> 
 
 :
             <NavLink to="/add-api" state={{ event: data }} className={styles.btnShare}> Add event </NavLink>
```
```
 {showModal && <AgendaAddEvent onClose={()=> setShowModal(false)}/>}
 ```

### Create AddEventAgenda.module.css
 ```
desktop
.page {
   position: fixed;
  top: 0;
  left: 0;
  background: rgba(247, 250, 250, 0.80);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
 width: 100%;
  z-index: 999;
}

mobile
.page {
  align-items: flex-start;
  position: relative;
  background-color: #ffffff;
  padding: 0 16px;
   position: static;
    top: unset;
    left: unset;
}

desktop
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px; 
  max-width: 600px;
  padding: 20px;
  z-index: 1000;

   position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

mobile
.container {
  padding: 8px 0 0 0;
   max-width: 100%
    position: static;
    top: unset;
    left: unset;
    transform: none;
}

 ```
Move the part of Form from Agenda.module.css to AddEventAgenda.module.css: 
 ```
/* ---------- Form ---------- */
...
 ```
### AgendaAddEvent.jsx
 ```
~~import styles from '../Agenda.module.css'~~
import styles from '../AddEventAgenda.module.css'
 ```

## Modal 7: Notifications 

### 1) Header.jsx

```
import Notifications.jsx
```

```
const [showModal, setShowModal] = useState(false)
```

```
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= breakpoint);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isDesktop;
}

 ```
<div className="btn-icon">
    {isDesktop ? (
    <button onClick={() => setShowModal(!showModal)}>
      <img src="/icons/notifications.png" alt="Notifications" />
    </button>
  ) : (
    <NavLink to="/notifications">
      <img src="/icons/notifications.png" alt="Notifications" />
    </NavLink>
  )}

   <div className="nmb-notifications">  <p>{notifications}</p></div>
   </div></div>
  ```
    ```
    ```
 {showModal && <Notifications/>}
 ```

### 2) App.css
 ```
.header {
  ...
position: relative}
 ```

### 3) Notifications.module.css

 ```
 /* ---------- Layout ---------- */

desktop
.page {
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;

width: 400px;
position: absolute;

top: 122px;
left: 48px;

  border-radius: 20px;
 box-shadow: 5px 7px 8px 0 rgba(152, 152, 152, 0.12);
}

mobile
.page {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;

  width: 100%;
  position: static;
  border-radius: 0px;
  box-shadow: none;
}

 ```


# ACTUALIZAR VERSION ONLINE 
Copy-paste Folders: Layout, Features, App.css

# CORRECTIONS UX/UI THOMAS 
- FRIENDS all the same color -> easier to read
- Add event Agenda add event name and change title (Figma)








