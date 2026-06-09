import App from "./App"
import PlainLayout from "./PlainLayout"
import { Login } from "./features/auth/Login"
import { Register } from "./features/auth/Register"
import { ProtectedPage } from "./features/auth/ProtectedPage"
import { Home } from "./features/events/Home"
import { AddEvent } from "./features/events/AddEvent"
import { Notifications } from "./features/notifications/Notifications"
import { Friends } from "./features/friends/Friends"
import { Users } from "./features/users/Users"
import { EventDetail } from "./features/myEvent/EventDetail"
import { Agenda } from "./features/agenda/Agenda"
import { AgendaAddEvent } from "./features/agenda/components/AgendaAddEvent"
import { EventApiDetail } from './features/agenda/components/EventApiDetail'
import { Error } from './layout/Error'


/**
 * @type {import"react-router".RouteObject[]}
 */

export const routes = [

    {
        element: <PlainLayout />,
        children: [
            {
                path: 'auth',
                children: [
                    {
                        path: 'register',
                        element: <Register />
                    },

                    {
                        path: 'login',
                        element: <Login />
                    }
                ]
            },
        ]
    },

    {
        element: <App />,
        children: [

            { index: true, element: <ProtectedPage><Home /></ProtectedPage> },
            { path: 'add', element: <ProtectedPage><AddEvent /></ProtectedPage> },
            { path: 'events/:id', element: <ProtectedPage><EventDetail /></ProtectedPage> },
            { path: 'friends', element: <ProtectedPage><Friends /></ProtectedPage> },
            { path: 'users', element: <ProtectedPage><Users /></ProtectedPage> },
            { path: 'notifications', element: <ProtectedPage> <Notifications /> </ProtectedPage> },
            { path: 'agenda', element: <ProtectedPage><Agenda /></ProtectedPage> },
            { path: 'add-api', element: <ProtectedPage><AgendaAddEvent /></ProtectedPage> },
            { path: 'settings', element: <ProtectedPage>'Settings'</ProtectedPage> },
            { path: 'eventsApi/:id', element: <ProtectedPage><EventApiDetail /></ProtectedPage> },
            { path: 'error', element: <ProtectedPage><Error /></ProtectedPage> }
        ]

    }

]