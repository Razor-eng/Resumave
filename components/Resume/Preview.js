'use client';

import { useEffect, useRef, useState } from 'react';
import Resume from './pdf';
import { useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaEye } from 'react-icons/fa6';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const Loader = () => (
    <div className="flex min-h-96 w-full items-center justify-center">
        <CgSpinner className="mx-auto mt-16 animate-spin text-center text-4xl text-primary-400 md:text-5xl" />
    </div>
);

const preview = url => {
    window.open(
        url,
        'Resume Preview',
        `toolbar=no, location=no, menubar=no, scrollbars=no, status=no, titlebar=no, resizable=no, width=600, height=800, left=${window.innerWidth / 2 - 300}, top=100`,
    );
};

function formatName(name) {
    if (!name) return 'Resume';

    const nameParts = name?.split(' ');

    // Check if the last name length is 3 characters
    const lastName = nameParts[nameParts?.length - 1];
    if (nameParts?.length === 3) {
        // If the last name has length 3, return first and last name with underscore
        return `${nameParts[0]}_${lastName}_Resume`;
    } else {
        // Otherwise, join first and second name with underscore
        return `${nameParts[0]}_${nameParts[1]}_Resume`;
    }
}

const Preview = () => {
    const parentRef = useRef(null);
    const resumeData = useSelector(state => state.resume);
    const document = <Resume data={resumeData} />;
    const [instance, updateInstance] = usePDF({ document });

    useEffect(() => {
        if (resumeData.saved) updateInstance(document);
    }, [resumeData.saved]);

    const fileName = formatName(resumeData.contact?.name);

    return (
        <div ref={parentRef} className="relative w-full md:max-w-[24rem] 2xl:max-w-[28rem]">
            {instance.loading ?
                <Loader />
                : <Document loading={<Loader />} file={instance.url}>
                    <Page
                        pageNumber={1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={<Loader />}
                        width={parentRef.current?.clientWidth}
                    />
                </Document>
            }

            {!instance.loading && (
                <div className="mt-3 flex justify-around">
                    <button onClick={() => preview(instance.url)} className="btn text-sm">
                        <span>Preview</span>
                        <FaEye />
                    </button>
                    <a
                        href={instance.url}
                        download={`${fileName}.pdf`}
                        className="btn text-sm"
                    >
                        <span>Download</span>
                        <FaDownload />
                    </a>
                </div>
            )}
        </div>
    );
};

export default Preview;