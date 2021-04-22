import React, { useState , useEffect } from 'react';
import { 
    CRow, 
    CCol, 
    CCard, 
    CCardHeader, 
    CCardBody, 
    CButton,
    CDataTable,
    CButtonGroup,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CFormGroup,
    CInput,
    CLabel,
    CTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useApi from '../services/api';

//CARREGAMENTO DE LISTA
export default () => {

    const api = useApi();    //chamando api
    const [loading, setLoading] = useState(true);//loading
    const [list, setList] = useState([]);//carregar lista
    
    //modal
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');

    //Criando tabelas
    const fields = [
        {label: 'Titulo', key: 'title'},
        {label: 'Data de Criação', key: 'datecreated', _style:{width:'200px'}},
        {label: 'Ações', key: 'actions', _style:{width:'1px'}},
    ];
    
    useEffect(() => {  
        getList();
    },[]);

    const getList = async () => {
        //ativar requisicao
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);

        //resposta result ou error
        if(result.error === ''){
            setList(result.list);
        }else{
            alert(result.error);
        }
    }

    //fechar modal
    const handleCloseModal = () => {
        setShowModal(false);
    }

    //modal Editando, pegando informação e exibir no modal
    const handleEditButton = (index) => {
            setModalId(list[index]['id']);
            setModalTitleField(list[index]['title']);
            setModalBodyField(list[index]['body']);
            setShowModal(true);
    }

    //modal quando Editar e Salvar os campos
    const handleModalSave = async () => {
            if(modalTitleField && modalBodyField){
                //Requisição Modal 
                setModalLoading(true);
                let result;
                let data = {
                    title: modalTitleField,
                    body: modalBodyField
                };
                if(modalId === ''){
                    result = await api.addWall(data);
                }else{
                    result = await api.updateWall(modalId, data);
                }
                setModalLoading(false);
                if(result.error === ''){
                    setShowModal(false);
                    getList();
                }else{
                    alert(result.error);
                }
            }else{
                alert('Preencha os campos !');
            }
    }

    //Remove itens btn excluir 
    const handleRemoveButton = async (index) =>{
            if(window.confirm('Tem certeza que deseja excluir?')){
                const result = await api.removeWall(list[index]['id']);
                if(result.error === ''){
                    getList();
                }else{
                    alert(result.error);
                }
            }
    }

    //Novo aviso (Limpar Historico  Dash)
    const handleNewButton = () => {
            setModalId('');
            setModalTitleField('');
            setModalBodyField('');
            setShowModal(true);
    }

return (
    <>
    {/*PAGINA AVISOS*/}
    <CRow>
        <CCol>
            <h2> Mural de Avisos </h2>
            <CCard>
                <CCardHeader>
                    <CButton color="primary" onClick={handleNewButton}>
                        <CIcon  name="cil-check" />
                         Novo Aviso 
                    </CButton>
                </CCardHeader>
                <CCardBody>
                    <CDataTable 
                        items={list}
                        fields={fields}
                        loading={loading}
                        noItemsView=""
                        hover
                        striped
                        bordered
                        pagination
                        itemsPerPage={2}
                        //Criacao de Editar e Excluir 
                        scopedSlots={{
                            'actions': (item, index) => (
                            <td>
                                <CButtonGroup>
                                    <CButton color="info" onClick={() => handleEditButton(index)}> Editar </CButton>
                                    <CButton color="danger" onClick={() => handleRemoveButton(index)}> Excluir </CButton>
                                </CButtonGroup>
                            </td>
                            )
                        }}
                    />
                </CCardBody>
            </CCard> 
        </CCol>
    </CRow>

    {/*CORPO MODAL*/}
    <CModal show={showModal} onClose={handleCloseModal} >
        <CModalHeader 
        closeButton
        > 
        {modalId === '' ? 'Novo': 'Editar'} Aviso 
        </CModalHeader>    
        <CModalBody>
            {/*FORMULARIO*/}
            <CFormGroup>
                <CLabel htmlFor="modal-title"> Titulo do aviso </CLabel>
                <CInput 
                    type="text"
                    id="modal-title"
                    placeholder="Digite um titulo para o aviso"
                    value={modalTitleField}
                    onChange={e=>setModalTitleField(e.target.value)}
                    disabled={modalLoading}
                />
            </CFormGroup>       
            <CFormGroup>
                <CLabel htmlFor="modal-body"> Corpo do aviso </CLabel>
                <CTextarea
                    id="modal-body"
                    placeholder="Digite o conteudo do aviso"
                    value={modalBodyField}
                    onChange={e=>setModalBodyField(e.target.value)}
                    disabled={modalLoading}
                />
            </CFormGroup>    
        </CModalBody>

        <CModalFooter>
            <CButton 
            color="primary"
            onClick={handleModalSave}
            disabled={modalLoading}>
            { modalLoading ? 'Carregando...' : 'Salvar'}
            </CButton>

            <CButton 
            color="secondary"
            onClick={handleCloseModal}
            disabled={modalLoading}
            > Cancelar </CButton>
        </CModalFooter>               
    </CModal>
    </>
    );
};