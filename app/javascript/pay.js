window.addEventListener("DOMContentLoaded", () => {

  // 決済処理を許可するurlは</items/:id/transactions>の場合です。
  // const path = location.pathname
  // const params = path.replace(/items/g, '').replace(/transactions/g, '').replace(/\//g, '');

  // if (path.includes("items") && path.includes("transactions") && /^([1-9]\d*|0)$/.test(params)) {
    const PAYJP_PK = process.env.PAYJP_PK
    Payjp.setPublicKey("pk_test_a31854acc844849a07138662");
    const form = document.getElementById("pay-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const sendWithoutCardInfo = () => {
        document.getElementById("number").removeAttribute("name");
        document.getElementById("cvc").removeAttribute("name");
        document.getElementById("exp_month").removeAttribute("name");
        document.getElementById("exp_year").removeAttribute("name");
        document.getElementById("pay-form").submit();
        document.getElementById("pay-form").reset();
      }
      const formResult = document.getElementById("pay-form");
      const formData = new FormData(formResult);

      // カード情報の構成や、トークン生成はこちらのリファレンスを参照
      // https://pay.jp/docs/payjs-v1
      const card = {
        number: formData.get("number"),
        cvc: formData.get("cvc"),
        exp_month: formData.get("exp_month"),
        exp_year: `20${formData.get("exp_year")}`,
      };

      Payjp.createToken(card, (status, response) => {
        if (status === 200) {
          // response.idでtokenが取得できます。
          const token = response.id;
          const renderDom = document.getElementById("pay-form");
          // サーバーにトークン情報を送信するために、inputタグをhidden状態で追加します。
          const tokenObj = `<input value=${token} type="hidden" name='token'>`;
          renderDom.insertAdjacentHTML("beforeend", tokenObj);
          sendWithoutCardInfo()
        } else {
          // window.alert('購入処理に失敗しました。\nお手数ですが最初からやり直してください。');
          sendWithoutCardInfo()
        }
      });
    });
  // }
});