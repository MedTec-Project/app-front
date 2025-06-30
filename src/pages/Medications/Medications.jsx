import {useEffect, useState} from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import "./Medications.css";
import heart from "../../assets/icons/favorito.png";
import search from "../../assets/icons/search.png";
import MedicationCard from "../../components/MedicationCard/MedicationCard.jsx";
import Select from "../../components/Select/Select.jsx";
import ModalRegisterMedicine from "./Register/ModalRegisterMedicine.jsx";
import {getMedicines, saveMedication} from "../../api/medication.jsx";
import {toast} from "react-toastify";
import ModalRegisterScheduling from "../Schedule/Register/ModalRegisterScheduling.jsx";
import {saveSchedule} from "../../api/schedule.jsx";

export default function Medications() {
    const [medications, setMedications] = useState([]);
    const [scheduleShow, setScheduleShow] = useState(null);
    const [selected, setSelected] = useState(null);
    const [sortOptions, setSortOptions] = useState([
        {id: "none", label: "Ordenar"},
        {id: "name", label: "Nome"},
        {id: "type", label: "Tipo"},
        {id: "pills", label: "Comprimidos"}
    ]);
    const [isOpenMedicineModal, setIsOpenMedicineModal] = useState(false);
    const [isOpenSchedulingModal, setIsOpenSchedulingModal] = useState(false);
    const [sort, setSort] = useState(sortOptions[0]);
    const [filters, setFilters] = useState({
        brands: {
            catarinense: false,
            nissei: false
        },
        types: {
            analgesico: false,
            antiInflamatorio: false,
            antialergico: false
        }
    });
    const brandOptions = [
        {id: "catarinense", label: "Catarinense", checked: filters.brands.catarinense},
        {id: "nissei", label: "Nissei", checked: filters.brands.nissei}
    ];
    const typeOptions = [
        {id: "analgesico", label: "Analgésico", checked: filters.types.analgesico},
        {id: "antiInflamatorio", label: "Anti-inflamatório", checked: filters.types.antiInflamatorio},
        {id: "antialergico", label: "Antialérgico", checked: filters.types.antialergico}
    ];

    const handleFilterChange = (category, id) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [id]: !prevFilters[category][id]
            }
        }));
    };

    const handleSortChange = (e) => {
        setSort(sortOptions.find(option => option.id === e.target.value));
    };

    const handleOpenModalMedicine = () => {
        setIsOpenMedicineModal(true);
    };

    const handleCloseMedicine = () => {
        setIsOpenMedicineModal(false);
    };

    const handleSaveMedication = (medicamento) => {
        saveMedication(medicamento).then((data) => {
            if (data) {
                toast.success("Medicamento cadastrado com sucesso!");
                handleCloseMedicine();
                fetchMedicines();
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

    const handleClean = () => {
        console.log("limpar")
    }

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        const medicines = await getMedicines();
        setMedications(medicines);
    };

    const handleOpenModalScheduling = (medication) => {
        if (medication) {
            setScheduleShow({
                oidMedicine: medication.oid,
                quantity: 1,
                interval: 1,
                initialDate: new Date(),
                finalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                reminder: '',
                receipt: '',
                oidDoctor: null,
            });
            setIsOpenSchedulingModal(true);
        }
    };

    const handleCloseScheduling = () => {
        setIsOpenSchedulingModal(false);
    };

    const handleSaveScheduling = (schedule) => {
        saveSchedule(schedule).then((data) => {
            if (data) {
                toast.success("Agendamento cadastrado com sucesso!");
                handleCloseScheduling();
                fetchMedicines();
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

    return (
        <div className="medications-container">
            <ModalRegisterScheduling isOpen={isOpenSchedulingModal} handleClose={handleCloseScheduling} handleSubmit={handleSaveScheduling}
                                     handleClean={handleClean} schedule={scheduleShow}/>
            <ModalRegisterMedicine isOpen={isOpenMedicineModal} handleClose={handleCloseMedicine} handleSubmit={handleSaveMedication}
                                   handleClean={handleClean}/>
            <div className="medications-filter-container">
                <h2>Filtros</h2>
                <FilterSection title="Marca" options={brandOptions} category="brands" onChange={handleFilterChange}/>
                <FilterSection title="Tipo" options={typeOptions} category="types" onChange={handleFilterChange}/>
            </div>
            <div className="medications-list">
                <div className="medication-header">
                    <div className="medications-add-button">
                        <button className="add-btn" onClick={handleOpenModalMedicine}>
                            <span>Adicionar Medicamento</span>
                        </button>
                    </div>
                </div>
                <div className="medications-list-container">
                    <div className="inputs-container">
                        <div className="search-input-container">
                            <img src={search} alt="Procurar"/>
                            <input type="text" placeholder="Procurar medicamentos..."/>
                        </div>
                        <div className="sort-input-container">
                            <Select options={sortOptions} onChange={handleSortChange}/>
                        </div>
                    </div>
                    <div className="grid-container">
                        {medications.map((med) => (
                            <MedicationCard
                                key={med.oid}
                                med={med}
                                selected={selected}
                                setSelected={setSelected}
                                schedule={scheduleShow}
                                handleOpenModal={() => handleOpenModalScheduling(med)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
