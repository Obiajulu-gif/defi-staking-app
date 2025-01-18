import React, { Component } from "react";
import tether from "../assets/tether.png";

class Main extends Component {
	render() {
		console.log(this.props.tetherBalance);

		return (
			<div
				id="content"
				className="mt-3"
				style={{ maxWidth: "600px", margin: "0 auto" }}
			>
				{/* Table displaying staking and reward balances */}
				<table className="table text-muted text-center">
					<thead>
						<tr style={{ color: "white" }}>
							<th scope="col">Staking Balance</th>
							<th scope="col">Reward Balance</th>
						</tr>
					</thead>
					<tbody>
						<tr style={{ color: "black", fontSize: "16px" }}>
							<td>
								<b>
									{window.web3.utils.fromWei(
										this.props.stakingBalance,
										"Ether"
									)}
								</b>
								USDT
							</td>
							<td>
								<b>
									{window.web3.utils.fromWei(this.props.rwdBalance, "Ether")}
								</b>
								RWD
							</td>
						</tr>
					</tbody>
				</table>

				{/* Form for staking functionality */}
				<div
					className="card mb-2 p-3"
					style={{
						opacity: "0.9",
						borderRadius: "10px",
						border: "1px solid #ddd",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<form className="mb-3">
						<div>
							<label
								className="float-left"
								style={{ fontWeight: "bold", fontSize: "16px" }}
							>
								Stake Tokens
							</label>
							<span
								className="float-right text-muted"
								style={{ marginRight: "8px", fontSize: "14px" }}
							>
								Balance:{" "}
								{window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
							</span>
						</div>
						<div className="input-group mt-3">
							<input
								type="text"
								placeholder="0"
								required
								className="form-control"
								style={{
									borderRadius: "5px 0 0 5px",
									border: "1px solid #ddd",
								}}
							/>
							<div
								className="input-group-append"
								style={{
									borderRadius: "0 5px 5px 0",
									border: "1px solid #ddd",
									borderLeft: "none",
									backgroundColor: "#f8f9fa",
									padding: "0 10px",
									display: "flex",
									alignItems: "center",
								}}
							>
								<img
									alt="tether"
									src={tether}
									style={{ width: "30px", marginRight: "16px" }}
								/>
								<span style={{ fontWeight: "bold" }}>USDT</span>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-primary btn-block mt-3"
							style={{ borderRadius: "5px" }}
						>
							Deposit
						</button>
						<button
							type="button"
							className="btn btn-danger btn-block mt-2"
							style={{ borderRadius: "5px" }}
						>
							Withdraw
						</button>
					</form>
				</div>

				{/* Airdrop section */}
				<div
					className="card p-3"
					style={{
						opacity: "0.8",
						borderRadius: "10px",
						border: "1px solid #ddd",
						boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<h5 className="card-title" style={{ fontWeight: "bold" }}>
						Airdrop
					</h5>
					<p className="card-text">
						Claim your free tokens by clicking the button below.
					</p>
					<button
						type="button"
						className="btn btn-success btn-block"
						style={{ borderRadius: "5px" }}
					>
						Claim Airdrop
					</button>
				</div>
			</div>
		);
	}
}

export default Main;
