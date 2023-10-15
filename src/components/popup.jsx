function popup({
  optionGroup,
  optionOrder,
  onGroupChange,
  onOrderChange,
}) {
  return (
    <div className="popup">
      <span>
        <label htmlFor="groupingDropdown">Grouping</label>
        <select
          id="groupingDropdown"
          value={optionGroup}
          onChange={(e) => onGroupChange(e.target.value)}
        >
          <option value="ByStatus">Status</option>
          <option value="ByUser">User</option>
          <option value="ByPriority">Priority</option>
        </select>
      </span>
      <span>
        <label htmlFor="orderingDropdown">Ordering</label>
        <select
          id="orderingDropdown"
          value={optionOrder}
          onChange={(e) => onOrderChange(e.target.value)}
        >
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </span>
    </div>
  );
}

export default popup;
