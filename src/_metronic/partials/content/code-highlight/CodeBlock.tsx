
import React, { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Highlight } from 'prism-react-renderer'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type Props = {
  code: string
  language: string
}

const CodeBlock: React.FC<Props> = ({ code, language }) => {
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) {
      return
    }

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [copied])

  useEffect(() => {
    if (!codeRef.current) {
      return
    }

    const prismCodeElement = codeRef.current.querySelector('.prism-code ') as HTMLDivElement
    if (prismCodeElement) {
      prismCodeElement.style.background = 'none'
      prismCodeElement.style.fontSize = '13px'
    }
  }, [])

  return (
    <div className='py-5'>
      <div className='highlight'>
        <OverlayTrigger
          key='copy-to-clipboard'
          placement='top'
          overlay={<Tooltip id='tooltip-copy-to-clipboard'>Copy Code</Tooltip>}
        >
          <div>
            <a className='highlight-copy btn'>{copied ? 'copied' : 'copy'}</a>
          </div>
        </OverlayTrigger>

        <div className='highlight-code' ref={codeRef}>
          <Highlight code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
              return (
                <pre className={className} style={{ maxHeight: '300px', ...style }}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )
            }}
          </Highlight>
        </div>
      </div>
    </div>
  )
}

export { CodeBlock }
