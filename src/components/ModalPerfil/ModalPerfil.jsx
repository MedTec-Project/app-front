import './ModalPerfil.css';
import {AiOutlineClose} from "react-icons/ai";
import ButtonComorbidade from '../ButtonComorbidade/buttonComorbidade';
import {useEffect, useRef, useState} from "react";

import foto from "../../assets/images/user.svg";
import {getUser, updateUser, uploadUserPhoto} from "../../api/user.jsx";
import {toast} from "react-toastify";
import {ModalRegisterComorbidity} from "./Comorbidity/ModalRegisterComorbidity.jsx";
import {deleteComorbidity, getComorbidity, saveComorbidity, updateComorbidity} from "../../api/comorbidity.jsx";
import ButtonDoctor from "../ButtonDoctor/buttonDoctor.jsx";
import ModalRegisterDoctor from "./Doctor/modalRegisterDoctor.jsx";
import {deleteDoctor, getDoctors, saveDoctor, updateDoctor} from "../../api/doctor.jsx";
import ModalEditProfile from "./Profile/ModalEditProfile.jsx";


export default function ModalPerfil({modalOpen, handleClose}) {

    const [user, setUser] = useState(null);
    const [tab, setTab] = useState(1);
    const [comorbidities, setComorbidities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [comorbidityShow, setComorbidityShow] = useState(null);
    const [doctorShow, setDoctorShow] = useState(null);
    const [isOpenComorbidityModal, setIsOpenComorbidityModal] = useState(false);
    const [isOpenDoctorModal, setIsOpenDoctorModal] = useState(false);
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchUser();
        fetchComorbidity();
        fetchDoctor();
    }, [modalOpen]);

    const fetchUser = async () => {
        const user = await getUser();
        console.log("user", user);
        setUser(user);
    };

    const selectFoto = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Image = reader.result.split(',')[1];

                try {
                    await uploadUserPhoto({imageBase64: base64Image});
                    const user = await getUser();
                    setUser(user);
                    toast.success("Foto atualizada com sucesso!");
                } catch (error) {
                    toast.error("Erro ao atualizar a foto");
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const handleSaveComorbidity = (comorbidity) => {
        if (comorbidity.oid) {
            updateComorbidity(comorbidity.oid, comorbidity).then((data) => {
                if (data) {
                    toast.success("Comorbididade atualizada com sucesso!");
                    handleCloseComorbidity();
                    fetchComorbidity();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        } else {
            saveComorbidity(comorbidity).then((data) => {
                if (data) {
                    toast.success("Comorbididade cadastrada com sucesso!");
                    handleCloseComorbidity();
                    fetchComorbidity();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    }

    const handleCloseComorbidity = () => {
        setComorbidityShow(null);
        setIsOpenComorbidityModal(false);
    }

    const fetchComorbidity = async () => {
        const comorbidity = await getComorbidity();
        setComorbidities(comorbidity);
    };

    const handleOpenComorbidity = () => {
        setComorbidityShow(null);
        setIsOpenComorbidityModal(true);
    };

    const handleEditComorbidity = (comorbidity) => {
        setComorbidityShow(comorbidity);
        setIsOpenComorbidityModal(true);
    }

    const handleAdd = () => {
        if (tab === 1) {
            handleOpenComorbidity();
        }
        if (tab === 2) {
            handleOpenDoctorModal();
        }
    }

    const handleDeleteComorbidity = () => {
        if (comorbidityShow) {
            deleteComorbidity(comorbidityShow.oid).then((data) => {
                if (data) {
                    toast.success("Comorbididade excluída com sucesso!");
                    handleCloseComorbidity();
                    fetchComorbidity();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    }

    const handleSaveDoctor = (doctor) => {
        if (doctor.oid) {
            updateDoctor(doctor.oid, doctor).then((data) => {
                if (data) {
                    toast.success("Médico atualizado com sucesso!");
                    handleCloseDoctorModal();
                    fetchDoctor();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        } else {
            saveDoctor(doctor).then((data) => {
                if (data) {
                    toast.success("Médico cadastrado com sucesso!");
                    handleCloseDoctorModal();
                    fetchDoctor();
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    }

    const handleCloseDoctorModal = () => {
        setDoctorShow(null);
        setIsOpenDoctorModal(false);
    }

    const fetchDoctor = async () => {
        const doctor = await getDoctors();
        setDoctors(doctor);
    };

    const handleEditDoctor = (doctor) => {
        setDoctorShow(doctor);
        setIsOpenDoctorModal(true);
    }

    const handleOpenDoctorModal = () => {
        setDoctorShow(null);
        setIsOpenDoctorModal(true);
    }

    const handleDeleteDoctor = () => {
        if (doctorShow) {
            deleteDoctor(doctorShow.oid).then(() => {
                toast.success("Médico excluído com sucesso!");
                handleCloseDoctorModal();
                fetchDoctor();
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    }

    const handleSaveProfile = (userEdit) => {
        console.log(userEdit);
        if (userEdit.oid) {
            updateUser(userEdit.oid, userEdit).then((data) => {
                if (data) {
                    toast.success("Usuário atualizado com sucesso!");
                }
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    if (error.response.data.mensagem instanceof Array) {
                        var mensagem = error.response.data.mensagem.join(", ");
                        toast.error(mensagem);
                    } else {
                        toast.error(error.response.data.mensagem);
                    }
                }
            });
        }
    }

    const handleCloseProfileModal = () => {
        setIsOpenProfileModal(false);
    }


    return user ? (
        <div className='mod-perfil' style={{display: modalOpen ? "block" : "none"}}>
            <ModalRegisterComorbidity isOpen={isOpenComorbidityModal} handleClose={handleCloseComorbidity}
                                      handleSubmit={handleSaveComorbidity} comorbidity={comorbidityShow}
                                      handleClean={handleDeleteComorbidity}/>
            <ModalRegisterDoctor
                isOpen={isOpenDoctorModal}
                handleClose={handleCloseDoctorModal}
                handleSubmit={handleSaveDoctor}
                doctor={doctorShow}
                handleClean={handleDeleteDoctor}
            />
            <ModalEditProfile
                isOpen={isOpenProfileModal}
                handleClose={handleCloseProfileModal}
                handleSubmit={handleSaveProfile}
                user={user}
            />
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                style={{display: "none"}}
            />
            <div className='mod-tittle'>
                <button className="close-btn" onClick={handleClose}>
                    <AiOutlineClose/>
                </button>
            </div>
            <div className='conteudo'>
                <div className='cnt-perfil'>
                    <div className='pos-info'>
                        <div className='pos-foto'>
                            <div className='foto'>
                                <img
                                    src={user.image ? "data:image/jpeg;base64," + user.image : foto}
                                    className="foto-perfil"
                                    alt="Foto do usuário"
                                    onClick={selectFoto}
                                    style={{cursor: "pointer"}}
                                />
                            </div>
                        </div>
                        <div className='pos-dados'>
                            <h3>{user.name}</h3>
                            <div className='pos-tit'>
                                <p>Email:</p>
                                <p>{user.email}</p>
                                <br/>
                                <p>Telefone:</p>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cnt-button'>
                    <button className='but-edit' onClick={() => setIsOpenProfileModal(true)}>Editar Perfil</button>
                </div>
            </div>
            <div className='nav-modal'>
                <div className='nav-itens'>
                    <button className={`iten-button ${tab === 1 ? 'iten-button-active' : ''}`}
                            onClick={() => setTab(1)}>Comorbidades
                    </button>
                    <button className={`iten-button ${tab === 2 ? 'iten-button-active' : ''}`}
                            onClick={() => setTab(2)}>Médicos
                    </button>
                </div>
            </div>
            <div className='cnt-iten'>
                <div className='cnt-position'>
                    {tab === 1 && (
                        <>
                            {comorbidities && comorbidities.map((comorbidity) => (
                                <ButtonComorbidade key={comorbidity.oid} comorbidity={comorbidity}
                                                   onClick={() => handleEditComorbidity(comorbidity)}/>
                            ))}
                        </>
                    )}
                    {tab === 2 && (
                        <>
                            {doctors && doctors.map((doctor) => (
                                <ButtonDoctor key={doctor.oid} doctor={doctor}
                                              onClick={() => handleEditDoctor(doctor)}/>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className='div-button'>
                <div className='pos-button'>
                    <button className='button-add' onClick={handleAdd}>Adicionar</button>
                </div>
            </div>
        </div>
    ) : null;
}