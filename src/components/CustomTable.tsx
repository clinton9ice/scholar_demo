'use client'
import React, {useState, useEffect, useCallback} from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, } from 'antd/es/table/interface';
  
  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
  }

  export type TableColumn = ColumnsType<any[]>


  type TablePagination = TableParams

  type Props = {
    TableColumn: TableColumn,
    TablePagination?: TablePagination
  }

export function CustomTable(props: Props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
   

    const updateRecord = (arg: string) =>{
        console.log(arg);
    }
      const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<unknown>,
      ) => {
       
  };
    

    return (
        <Table
        columns={props.TableColumn}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    );
}