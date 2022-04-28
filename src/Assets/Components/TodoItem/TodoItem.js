// scss file
import "./todoItem.scss";

function TodoItem ({item, id, deleteItem, change, isCompleted}) {
    return (
        <li className="item" data-id={id}>
            <input className="item-input" data-id={id} checked={isCompleted} onClick={(change)} type="checkbox"></input>
            <p className={`item-text ${isCompleted && 'select'}`}>{item}</p>
            <button className="item-btn" data-id={id} onClick={(deleteItem)} type="button">Delete</button>
        </li>
    )
}
export default TodoItem;