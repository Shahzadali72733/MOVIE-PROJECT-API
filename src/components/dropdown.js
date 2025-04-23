const DropDown = ({ itemsPerPage, onChangeItemsPerPage }) => {
    return (
      <>
        <p style={{ paddingRight: "10px" }}>Movie/Page</p>
        <select
          className="btn-primary"
          value={itemsPerPage}
          onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </>
    );
  };
  
  export default DropDown;
  