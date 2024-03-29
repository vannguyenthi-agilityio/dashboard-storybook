/* eslint-disable */
import { useState } from 'react';
import { Select, Text, Flex, IconButton, Tooltip } from '@chakra-ui/react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  className?: string;
  totalCount?: number;
  currentPage?: number;
  offset?: number;
  pageSize?: number;
  from?: number;
  to?: number;
  canNextPage?: boolean;
  canPreviousPage?: boolean;
  onPageChange?: (offset: number) => void;
  onPageSizeChange?: (pageSizeValue: number) => void;
}

export const Pagination = ({
  className,
  totalCount,
  currentPage = 1,
  offset = 0,
  pageSize = 10,
  canNextPage = true,
  canPreviousPage = true,
  from = 1,
  to = 10,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  const [data, setData] = useState({
    pageOffset: offset,
    pageSizeState: pageSize,
    currentPage: currentPage,
    from: from,
    to: to,
    selectedPageSize: {
      label: pageSize.toString(),
      value: pageSize.toString()
    }
  });
  const pageCount = Math.ceil(totalCount / data.pageSizeState);

  const nextPage = () => {
    const newOffset: number = offset + data.pageSizeState;
    onPageChange(newOffset);
    setData({ ...data, pageOffset: newOffset });

    setData({
      ...data,
      currentPage:
        data.currentPage < pageCount ? data.currentPage + 1 : data.currentPage
    });
  };

  const previousPage = () => {
    const newOffset: number =
      data.pageOffset - data.pageSizeState >= 0
        ? data.pageOffset - data.pageSizeState
        : 0;
    onPageChange(newOffset);
    setData({ ...data, pageOffset: newOffset });
    setData({
      ...data,
      currentPage:
        data.currentPage > 1 ? data.currentPage - 1 : data.currentPage
    });
  };

  const setPageSize = (value: number) => {
    onPageSizeChange(value);
    setData({
      ...data,
      pageSizeState: value,
      currentPage: data.currentPage > 2 ? 2 : data.currentPage
    });
  };

  return (
    <Flex justifyContent="flex-end" className={className}>
      <Flex
        justifyContent="space-between"
        minW="375px"
        m={4}
        alignItems="center"
        color="default.grey.600"
      >
        <Flex alignItems="center">
          <Text flexShrink={0} mr={2} color="default.grey.600">
            Rows per page:{' '}
          </Text>
          <Select
            w={20}
            value={data.pageSizeState}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 50].map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption}
              </option>
            ))}
          </Select>
          <Text flexShrink={0} ml={2} color="default.grey.600">
            {data.pageSizeState * data.currentPage - data.pageSizeState + 1}-{' '}
            {data.pageSizeState * data.currentPage}
            of
            {totalCount}{' '}
          </Text>
        </Flex>
        <Flex minW="85px" justifyContent="space-between">
          <Tooltip label="Previous Page">
            <IconButton
              aria-label="previous"
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              aria-label="next"
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};
