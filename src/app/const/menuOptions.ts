import { faChartPie, faUserPlus, faCirclePlus, faListCheck, faUsers, faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const MENU = [
    {
        nameOption: "Estadísticas",
        icon: faChartPie,
        redirect:"/home/statistics"
    },
    {
        nameOption: "Agregar producto",
        icon: faCirclePlus,
        redirect:"/home/add-product"
    },
    {
        nameOption: "Compras",
        icon: faListCheck,
        redirect:"/home/shopping"
    },
    {
        nameOption: "Usuarios",
        icon: faUsers,
        redirect:"/home/users"
    },
    {
        nameOption: "Consultar productos",
        icon: faMagnifyingGlass,
        redirect:"/home/search-product"
    },
    {
        nameOption: "Registrar administrador",
        icon: faUserPlus,
        redirect:"/home/new-user"
    },
    {
        nameOption: "Cerrar sesión",
        icon: faArrowLeft,
        redirect:"/login"
    },
]