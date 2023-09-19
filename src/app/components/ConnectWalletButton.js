import styles from "../styles/ConnectWallet.module.css";
import ButtonMenu from "./buttons/ButtonMenu";

const ConnectWalletButton = ({
  onPressLogout,
  onPressConnect,
  loading,
  address,
}) => {
  return (
    <div>
      {address && !loading ? (
        <ButtonMenu onClick={onPressLogout}>Disconnect</ButtonMenu>
      ) : loading ? (
        <ButtonMenu disabled={true}>Loading...</ButtonMenu>
      ) : (
        <ButtonMenu onClick={onPressConnect}>Connect Wallet</ButtonMenu>
      )}
    </div>
  );
};

export default ConnectWalletButton;
