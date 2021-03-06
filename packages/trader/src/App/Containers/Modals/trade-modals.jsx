import React from 'react';
import { urlFor } from '@deriv/shared/utils/url';
import { connect } from 'Stores/connect';
import UnsupportedContractModal from 'App/Components/Elements/Modals/UnsupportedContractModal';
import MarketUnavailableModal from 'App/Components/Elements/Modals/MarketUnavailableModal';
import ServicesErrorModal from 'App/Components/Elements/Modals/ServicesErrorModal';

const TradeModals = ({
    clearPurchaseInfo,
    is_unsupported_contract_modal_visible,
    is_market_unavailable_visible,
    is_services_error_visible,
    is_virtual,
    toggleUnsupportedContractModal,
    setHasOnlyForwardingContracts,
    resetPreviousSymbol,
    toggleServicesErrorModal,
    resetPurchase,
    services_error,
}) => {
    const marketUnavailableOnConfirm = () => {
        setHasOnlyForwardingContracts(false);
        resetPreviousSymbol();
    };

    const marketUnavailableOnCancel = () =>
        window.open(urlFor('trading', { legacy: true })) && setHasOnlyForwardingContracts(false);

    const servicesErrorModalOnConfirm = () => {
        toggleServicesErrorModal(false);
        if (services_error.type === 'buy') {
            clearPurchaseInfo();
            resetPurchase();
        }
    };

    const unsupportedContractOnConfirm = () => {
        window.open(urlFor('user/portfoliows', { legacy: true }), '_blank');
        unsupportedContractOnClose();
    };

    const unsupportedContractOnClose = () => {
        toggleUnsupportedContractModal(false);
    };

    return (
        <React.Fragment>
            <UnsupportedContractModal
                onConfirm={unsupportedContractOnConfirm}
                onClose={unsupportedContractOnClose}
                is_visible={is_unsupported_contract_modal_visible}
            />

            <MarketUnavailableModal
                onConfirm={marketUnavailableOnConfirm}
                onCancel={marketUnavailableOnCancel}
                is_visible={is_market_unavailable_visible}
            />

            <ServicesErrorModal
                onConfirm={servicesErrorModalOnConfirm}
                services_error={services_error}
                is_visible={is_services_error_visible}
                is_virtual={is_virtual}
            />
        </React.Fragment>
    );
};

export default connect(({ ui, modules, common, client }) => ({
    is_market_unavailable_visible: ui.has_only_forward_starting_contracts,
    is_services_error_visible: ui.is_services_error_visible,
    is_unsupported_contract_modal_visible: ui.is_unsupported_contract_modal_visible,
    is_virtual: client.is_virtual,
    proposal_info: modules.trade.proposal_info,
    purchase_info: modules.trade.purchase_info,
    resetPreviousSymbol: modules.trade.resetPreviousSymbol,
    clearPurchaseInfo: modules.trade.clearPurchaseInfo,
    resetPurchase: modules.trade.requestProposal,
    services_error: common.services_error,
    setHasOnlyForwardingContracts: ui.setHasOnlyForwardingContracts,
    toggleServicesErrorModal: ui.toggleServicesErrorModal,
    toggleUnsupportedContractModal: ui.toggleUnsupportedContractModal,
}))(TradeModals);
