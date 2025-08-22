const SkeletionTable = ({ items, count }) => {
  items = items || Array.from({ length: count });
  return (
    <div>
      <table className="animate-pulse w-full border-separate border-spacing-4 table-fixed">
        <thead>
          <tr>
            <th scope="col">
              <div className="h-4 bg-gray-200 dark:bg-gray-500"/>
            </th>
            <th scope="col">
              <div className="h-4 bg-gray-200 dark:bg-gray-500"/>
            </th>
            <th scope="col">
              <div className="h-4 bg-gray-200 dark:bg-gray-500"/>
            </th>
            <th scope="col">
              <div className="h-4 bg-gray-200 dark:bg-gray-500"/>
            </th>
            <th scope="col">
              <div className="h-4 bg-gray-200 dark:bg-gray-500"/>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <div className="h-2 bg-gray-200 dark:bg-gray-500"/>
              </td>
              <td>
                <div className="h-2 bg-gray-200 dark:bg-gray-500"/>
              </td>
              <td>
                <div className="h-2 bg-gray-200 dark:bg-gray-500"/>
              </td>
              <td>
                <div className="h-2 bg-gray-200 dark:bg-gray-500"/>
              </td>
              <td>
                <div className="h-2 bg-gray-200 dark:bg-gray-500"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletionTable;
