import eyeBlueIcon from "../assets/svg/eye_blue.js"
import downloadBlueIcon from "../assets/svg/download_blue.js"

export default (billUrl, billName) => {
  return (
    `<div class="icon-actions">
      <div id="eye" data-testid="icon-eye" data-bill-url=${billUrl}>
      ${eyeBlueIcon}
      </div>
      <div id="download" data-testid="icon-download" data-bill-url=${billUrl} data-name=${billName}>
      ${downloadBlueIcon}
      </div>
    </div>`
  )
}