import NiceModal from "@ebay/nice-modal-react";
import LoginModal from "@/components/GlobalModal/login";

/**
 * 登录弹框
 * @returns
 */
export const showLogin = () => NiceModal.show(LoginModal); // show the modal
