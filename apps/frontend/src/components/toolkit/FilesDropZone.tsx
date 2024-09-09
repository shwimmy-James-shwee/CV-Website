import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { TitleText } from '../text/TitleText';
import { Col, Row } from 'react-bootstrap';
import { InfoText } from '../text/InfoText';

const baseStyle = {
  minHeight: '100px',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'var(--theme-border-cl)',
  borderStyle: 'dashed',
  backgroundColor: 'var(--theme-primary-background-color)',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  borderColor: 'var(--theme-active-cl)',
};

const acceptStyle = {
  borderColor: 'var(--theme-accepted-cl)',
};

const rejectStyle = {
  borderColor: 'var(--theme-rejected-cl)',
};

export interface DropZoneFile {
  id: string;
  name: string;
}

interface FilesDropZoneProps {
  files: DropZoneFile[];
  title?: string;
  titleSize?: number;
  bodyText?: string | JSX.Element;
  onDrop: (acceptedFiles: File[]) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

function FilesDropZone({ files = [], disabled, className, onDrop, title, titleSize, bodyText }: FilesDropZoneProps) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    disabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div className={className}>
      {title && (
        <TitleText className='text-center w-100' size={titleSize ?? 1.2} data-testid='files-dropzone-title'>
          {title}
        </TitleText>
      )}
      <div {...getRootProps({ style })} className='mt-2'>
        <input {...getInputProps()} disabled={disabled} data-testid='files-dropzone-input' />
        <Row className='w-100 text-center mb-2'>
          <Col>
            <svg width='25' height='24' viewBox='0 0 25 24' fill='#E5E5E5' data-testid='files-dropzone-icon'>
              <path d='M19.85 10.04C19.17 6.59 16.14 4 12.5 4C9.61 4 7.1 5.64 5.85 8.04C2.84 8.36 0.5 10.91 0.5 14C0.5 17.31 3.19 20 6.5 20H19.5C22.26 20 24.5 17.76 24.5 15C24.5 12.36 22.45 10.22 19.85 10.04ZM19.5 18H6.5C4.29 18 2.5 16.21 2.5 14C2.5 11.95 4.03 10.24 6.06 10.03L7.13 9.92L7.63 8.97C8.58 7.14 10.44 6 12.5 6C15.12 6 17.38 7.86 17.89 10.43L18.19 11.93L19.72 12.04C21.28 12.14 22.5 13.45 22.5 15C22.5 16.65 21.15 18 19.5 18ZM8.5 13H11.05V16H13.95V13H16.5L12.5 9L8.5 13Z' />
            </svg>
          </Col>
        </Row>
        {bodyText && (
          <Row className='w-100 text-center'>
            <Col className='w-100 text-center' data-testid='files-dropzone-body-text'>
              {bodyText}
            </Col>
          </Row>
        )}
        <Row className='w-100 text-center text-nowrap d-flex flex-row justify-content-center'>
          <InfoText size={0.8} className='text-wrap' data-testid='files-dropzone-list'>
            {files.map((file, idx) => {
              return file.name + (files.length - 1 === idx ? '' : ', ');
            })}
          </InfoText>
        </Row>
      </div>
    </div>
  );
}

export default FilesDropZone;
