import { KTCard } from '@metronic/helpers';
import { TableListUomDetailHeader } from '../molecules/header/TableListHeader';
import { UomTable } from '../organism/table/UomTable';
import { useParams } from 'react-router-dom';

const UomDetailTableLayout = () => {
    const { materialId } = useParams<{ materialId: string }>();

    // Handle case where materialId is undefined
    if (!materialId) {
        return (
            <div className='card p-5 w-100 mb-4'>
                <h2 className='mb-6'>UOM</h2>
                <div className='alert alert-danger'>
                    Invalid Material ID. Please check the URL and try again.
                </div>
            </div>
        );
    }

    return (
        <div className='card p-5 w-100 mb-4'>
            <h2 className='mb-6'>UOM</h2>
            <KTCard>
                <TableListUomDetailHeader />
            </KTCard>
        </div>
    );
};

export default UomDetailTableLayout;