/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, Row, getCoreRowModel } from '@tanstack/react-table';
import { CustomHeaderService } from './columns/CustomHeaderService';
import { CustomRowService } from './columns/CustomRowService';
import { KTCardBody } from '@metronic/helpers';
import { serviceColumns } from './columns/_serviceColumns';
import { Service } from '../../molecules/core/_models';
interface ServiceTableProps {
    serviceDataChoice: any[]
    onDelete: (index: number) => void
  }
  
  const ServiceTable: React.FC<ServiceTableProps> = ({ serviceDataChoice, onDelete }) => {
    const [dataService, setDataService] = useState<Service[]>([])
  
    useEffect(() => {
      const dummyData = serviceDataChoice.map((item, index) => ({
        id: index, // Simpan index sebagai ID
        service: item.service.name,
        supplier: item.supplier.name
      }))
      setDataService(dummyData)
    }, [serviceDataChoice])
  
    const columns = useMemo(() => serviceColumns, [])
    
    const table = useReactTable({
      data: dataService,
      columns,
      getCoreRowModel: getCoreRowModel(),
      meta: {
        onDelete: onDelete
      }
    })

    return (
        <KTCardBody className='py-4 w-100 p-0'>
            <div className='table-responsive'>
                <table
                    id='kt_table_service'
                    className='table align-middle table-border-dashed table-bordered fs-6 gy-4 dataTable no-footer'
                >
                    <thead>
                        {table.getHeaderGroups().map((columnGroup) => (
                            <tr key={columnGroup.id} className='text-start fw-bold fs-7 gs-0'>
                                {columnGroup.headers.map((header) => (
                                    <CustomHeaderService key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='text-gray-600'>
                        {table.getRowModel().rows.map((row: Row<Service>) => (
                            <CustomRowService key={row.id} row={row} />
                        ))}
                    </tbody>
                </table>
            </div>
        </KTCardBody>
    );
};

export { ServiceTable };