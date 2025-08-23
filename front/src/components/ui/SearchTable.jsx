import Textinput from "@/components/ui/Textinput";

const SearchTable = ({
  title,
  filter,
  setFilter,
  filterPlaceholder,
  endItem,
}) => {
  return (
    <div className="md:flex pb-6 items-center">
      <h6 className="flex-1 md:mb-0 mb-3">{title}</h6>
      <div className="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse md:space-y-0 space-y-5">
        <div>
          <Textinput
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={filterPlaceholder || "جستجو ..."}
          />
        </div>
        {endItem && endItem}
      </div>
    </div>
  );
};

export default SearchTable;
