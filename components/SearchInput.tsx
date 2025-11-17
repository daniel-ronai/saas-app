'use client';

import React, {useEffect, useState} from 'react';
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 1. Prevent running on initial render when searchQuery is undefined
        if (searchQuery === undefined) return;

        const delayDebounceFn = setTimeout(() => {
            const currentTopic = searchParams.get("topic") || "";

            // 2. If value didn't change → do nothing
            if (searchQuery === currentTopic) return;

            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                // 3. Only remove key if it actually exists
                if (currentTopic !== "") {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);


    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relavite border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src='/icons/search.svg' alt='search' width={15} height={15} />
            <input
                placeholder='Search companions...'
                className="outline-non"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchInput;
