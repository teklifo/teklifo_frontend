import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationType } from "@/types";

type PageLinkType = {
  href: string;
  page: number;
  isCurrent?: boolean;
  children: React.ReactNode;
};

const PageLink = ({
  href,
  page,
  isCurrent = false,
  children,
}: PageLinkType) => {
  return (
    <li>
      <Link
        href={`${href}${page}`}
        className={`flex
        items-center
        justify-center
        h-[40px]
        w-[40px]
        mx-[3px]
        rounded-full
        leading-tight
        border   
        ${
          isCurrent
            ? "bg-sky-500 border-sky-500 text-white dark:text-black"
            : "text-zinc-900 bg-white border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800"
        }
        `}
      >
        {children}
      </Link>
    </li>
  );
};

const Pagination = ({
  href,
  pagination: { current, total, skipped },
}: {
  href: string;
  pagination: PaginationType;
}) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center">
        {skipped > 0 && (
          // Prev button
          <PageLink href={href} page={current - 1}>
            <span className="sr-only">Previous</span>
            <ChevronLeft />
          </PageLink>
        )}
        {/* First Page */}
        {skipped > 0 && current - 3 > 1 && (
          <PageLink href={href} page={1}>
            1
          </PageLink>
        )}
        {/* Prev pages */}
        {skipped > 0 &&
          [...Array(Math.min(skipped, 3))].map((_x, i) => (
            <PageLink key={i} href={href} page={current - i - 1}>
              {`${current - i - 1}`}
            </PageLink>
          ))}
        {/* Current page */}
        <PageLink
          href={href}
          page={current}
          isCurrent={true}
        >{`${current}`}</PageLink>
        {/* Next pages */}
        {[...Array(Math.min(total - current, 3))].map((_x, i) => (
          <PageLink key={i} href={href} page={current + i + 1}>
            {`${current + i + 1}`}
          </PageLink>
        ))}
        {/* Last page */}
        {current + 3 < total && (
          <PageLink href={href} page={total}>
            {total}
          </PageLink>
        )}
        {/* Next button */}
        {current !== total && (
          <PageLink href={href} page={current + 1}>
            <span className="sr-only">Previous</span>
            <ChevronRight />
          </PageLink>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
