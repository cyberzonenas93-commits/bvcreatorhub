import { useRef } from 'react'

import { ImageIcon } from '../ui/Icons'

type LogoUploadFieldProps = {
  helper?: string
  label?: string
  logoFileName: string
  logoImageUrl: string
  onClear: () => void
  onSelectFile: (file: File | null) => void
}

export function LogoUploadField({
  helper = 'Shown on event pages and organizer touchpoints. Upload PNG, JPG, or WebP.',
  label = 'Business Logo',
  logoFileName,
  logoImageUrl,
  onClear,
  onSelectFile,
}: LogoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hasLogo = Boolean(logoImageUrl)

  return (
    <div className="form-field form-field--full settings-logo-field">
      <span>{label}</span>

      <div className="settings-logo-upload">
        <div
          className={
            hasLogo
              ? 'settings-logo-preview settings-logo-preview--filled'
              : 'settings-logo-preview'
          }
        >
          {hasLogo ? (
            <img alt={logoFileName || 'Business logo'} src={logoImageUrl} />
          ) : (
            <>
              <span className="settings-logo-preview__icon">
                <ImageIcon className="button-icon" />
              </span>
              <div className="settings-logo-preview__copy">
                <strong>No logo uploaded</strong>
                <small>Add your organizer logo for event pages and brand consistency.</small>
              </div>
            </>
          )}
        </div>

        <div className="settings-logo-actions">
          <input
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="sr-only"
            onChange={(event) => {
              onSelectFile(event.target.files?.[0] ?? null)
              event.target.value = ''
            }}
            ref={inputRef}
            type="file"
          />

          <div className="settings-logo-actions__buttons">
            <button
              className="surface-button surface-button--wide"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              {hasLogo ? 'Change Logo' : 'Upload New Logo'}
            </button>

            {hasLogo ? (
              <button
                className="surface-button surface-button--wide"
                onClick={onClear}
                type="button"
              >
                Remove Logo
              </button>
            ) : null}
          </div>

          <small>{helper}</small>
          {logoFileName ? <span className="settings-logo-file">{logoFileName}</span> : null}
        </div>
      </div>
    </div>
  )
}
