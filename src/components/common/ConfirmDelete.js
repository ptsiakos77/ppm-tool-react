export default function ConfirmDelete(props) {
    return (
        <div>
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>Are you sure you want to delete this {props.type}?</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
            {document.getElementById('modal1').openModal()}
        </div>
    )
}