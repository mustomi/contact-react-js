import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, Link, useLoaderData,Form, } from 'react-router-dom'
import { getContacts, createContact, } from '../contacts'

export async function action () {
    const contact = await createContact();
    return { contact };
}

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
  }

const Root = () => {
    const { contacts } = useLoaderData();
    return (
        <div className='container-fluid'>
            <div className='container-fluid wrapper vh-100'>
                <div className='row'>
                    <div className='col-sm-4 vh-100 bg-dark'>
                        <div className='row text-white'>
                            <div className='header d-flex p-3 gap-3'>
                                <div className='brand-logo'>
                                    <img src="https://drive.google.com/uc?export=view&id=12PIPtqTUQ59itYpW_Tx3HMoLqMfu6roJ" alt="" width="40" height="auto" />
                                </div>
                                <div className='tittle-brand'>
                                    <h1>My Contact App</h1>   
                                </div>
                            </div>
                            <div className='d-flex justify-content-space-evenly align-items-center gap-3 ms-2 p-3'>
                                <form id="search-form" role="search">
                                    <input
                                        id="q"
                                        aria-label="Search contacts"
                                        placeholder="Search"
                                        type="search"
                                        name="q"
                                    />
                                    <div
                                        id="search-spinner"
                                        aria-hidden
                                        hidden={true}
                                    />
                                    <div
                                        className="sr-only"
                                        aria-live="polite"
                                    ></div>
                                </form>
                                <Form method="post">
                                    <button className='btn btn-primary' type="submit">New</button>
                                </Form>
                            </div>
                            <div className='navbar mt-3 ms-4'>
                                <nav>
                                    {contacts.length ? (
                                        <ul>
                                        {contacts.map((contact) => (
                                            <li key={contact.id}>
                                            <Link to={`contacts/${contact.id}`}>
                                                {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                                ) : (
                                                <i>No Name</i>
                                                )}{" "}
                                                {contact.favorite && <span>★</span>}
                                            </Link>
                                            </li>
                                        ))}
                                        </ul>
                                         ) : (
                                        <p>
                                        <i>No contacts</i>
                                        </p>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div id='detail' className='col-sm-8 vh-100'>
                        <Outlet />
                    </div>
                    <footer className=''>Ini footer</footer>
                </div>
            </div>
        </div>
    )
}

export default Root