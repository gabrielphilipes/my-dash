<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <meta name="viewport" content="width=device-width" />
      <link rel="preload" as="image" href="https://maily.to/brand/logo.png" />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
    </head>
    <body style="margin: 0">
      <table
        align="center"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          max-width: 600px;
          min-width: 300px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding: 0.5rem;
        "
      >
        <tbody>
          <tr style="width: 100%">
            <td>
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="margin-top: 0px; margin-bottom: 0px"
              >
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td align="left" data-id="__react-email-column">
                      <AppLayoutLogo />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="max-width: 37.5em; height: 64px"
              >
                <tbody>
                  <tr style="width: 100%">
                    <td />
                  </tr>
                </tbody>
              </table>
              <slot />
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
</template>
