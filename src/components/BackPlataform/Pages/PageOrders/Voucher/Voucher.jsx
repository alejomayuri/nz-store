import { formatPrice } from "@/utils/formatPrice";

const Voucher = ({ image }) => {

    return (
        <>
            <div>
                <div>
                    <img 
                        src={image}
                        alt="voucher"
                    />
                </div>
            </div>
        </>
    );
}

export { Voucher };