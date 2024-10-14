import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import TableUser from '../components/Tables/TableUser';
const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10 ">
        <TableUser />
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
