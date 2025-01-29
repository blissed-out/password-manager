import React, { useState, useRef, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [PasswordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = () => {
        if (ref.current.state.includes("hover-look-around")) {
            ref.current.state = "hover-cross"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.state = "hover-look-around"
            passwordRef.current.type = "text"
        }

    }

    const savePassword = async () => {

        if (form.password.length > 3 && form.username.length > 3 && form.site.length > 3) {

            setPasswordArray([...PasswordArray, { ...form }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form}) })
            console.log("this is saved one ", form)

            setform({ site: "", username: "", password: "" })
            toast("Password Added")
        }
        else {
            toast("Minimum 3 letter!")
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copytext = (text) => {
        toast("Copied");
        navigator.clipboard.writeText(text)
    }

    const edit = (_id) => {
        console.log("Editing mode of _id ", _id);
        setform({ ...PasswordArray.filter(i => i._id === _id)[0], id: _id })
        setPasswordArray(PasswordArray.filter(i => i._id !== _id));
    }

    const del = async (_id) => {
        const updatedPasswordArray = PasswordArray.filter(item => item._id !== _id);
        console.log("this is deleting id ", _id)
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({_id})})
        setPasswordArray(updatedPasswordArray);
        toast("Deleted")
    }


    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>
            <ToastContainer />
            <div className="p-4 md:px-36 py-4 mycontainer max-w-6xl">

                <div className="flex flex-col p-4">
                    <h1 className='text-center text-4xl text-sky-400 font-bold'>Passman :)</h1>
                    <p className='text-center text-lg text-sky-600'>Password manager, Simplified!</p>

                    <div className="flex flex-col text-black p-5 gap-6 items-center">
                        <input value={form.site} id='site' name='site' onChange={handleChange} className='rounded-full border border-yellow-600 w-full p-4 py-1' type="text" placeholder='Your website url' />

                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <input value={form.username} id='username' name='username' onChange={handleChange} className='rounded-full border w-full border-yellow-600 p-4 py-1' type="text" placeholder='Username' />

                            <div className='relative'>

                                <input ref={passwordRef} id='password' value={form.password} name='password' onChange={handleChange} className='rounded-full border w-full border-yellow-600 p-4 py-1' type="password" placeholder='Password' />
                                <span className='absolute right-[5px] top-[2px] cursor-pointer' onClick={showPassword}>
                                    <lord-icon
                                        ref={ref}
                                        src="https://cdn.lordicon.com/dicvhxpz.json"
                                        trigger="click"
                                        delay="100"
                                        stroke="bold"
                                        colors="primary:#5c230a,secondary:#8930e8"
                                        state="hover-cross">
                                    </lord-icon>
                                </span>

                            </div>

                        </div>

                        <div className="button flex justify-center items-center bg-blue-800 hover:bg-blue-400 rounded-full px-6 py-2 cursor-pointer">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                colors="primary:#ffffff"
                                trigger="hover">
                            </lord-icon>
                            <button onClick={savePassword} className='text-white'>Add Password</button>

                        </div>

                    </div>
                </div>

                <div className="password">
                    <h2 className='text-lg font-bold text-blue-300'>Your password Manager</h2>
                    {PasswordArray.length === 0 && <div className='text-slate-400 text-center py-36'>No passwords to show</div>}
                    {PasswordArray.length != 0 && <table className="table-auto w-full">
                        <thead className='bg-green-800'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {PasswordArray.map((items) => {
                                return <tr>
                                    <td className='text-center'><a href={items.site} target='_blank'>{items.site}</a></td>
                                    <td className='text-center relative'>{items.username}
                                        <div className='lordcopy flex cursor-pointer absolute top-0 right-0' onClick={() => { copytext(items.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='text-center flex justify-center items-center relative'>{items.password}
                                        <div className='lordcopy flex cursor-pointer absolute right-0' onClick={() => { copytext(items.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='action flex justify-center items-center cursor-pointer'>
                                            <span className='edit mx-1' onClick={() => { edit(items._id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/ylvuooxd.json"
                                                    trigger="hover"
                                                    style={{ "width": "30px", "height": "30px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className='delete mx-1' onClick={() => { del(items._id) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            }
                            )}
                        </tbody>
                    </table>}


                </div>
            </div>
        </>
    )
}

export default Manager
