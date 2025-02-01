import {useCallback, useState} from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import Section from '../components/Section/Section';
import {TaxSlab} from '../types/IncomeTaxSlab';
import './styles.css';

const IncomeTaxPage = () => {
    const [income, setIncome] = useState<string>('');
    const [useStandardDeduction, setUseStandardDeduction] = useState(true);
    const [standardDeduction, setStandardDeduction] = useState(0);
    const [year, setYear] = useState('2025');
    const [regime] = useState('1');

    //calculations
    const [taxableIncome, setTaxableIncome] = useState(0);
    const [applicableTax, setApplicableTax] = useState(0);
    const [slabData, setSlabData] = useState<TaxSlab[]>([]);
    const [cess, setCess] = useState(0);
    const [incomeTax, setIncomeTax] = useState(0);

    const setTaxationYear = useCallback((event: SelectChangeEvent) => {
        setYear(event.target.value);
    }, []);

    const onIncomeChange = useCallback((e: any) => setIncome(formatPrice(convertPriceToInt(e.target.value))), []);
    const onApplyStdDeductionChange = useCallback(() => {
        setUseStandardDeduction((apply) => !apply);
    }, []);

    const calculateTaxSlabs = useCallback((income: number): TaxSlab[] => {
        const slabs = [
            {rangeStart: 0, rangeEnd: 400000, rate: '0%', limit: 400000, percent: 0},
            {rangeStart: 400000, rangeEnd: 800000, rate: '5%', limit: 800000, percent: 5},
            {rangeStart: 800000, rangeEnd: 1200000, rate: '10%', limit: 1200000, percent: 10},
            {rangeStart: 1200000, rangeEnd: 1600000, rate: '15%', limit: 1600000, percent: 15},
            {rangeStart: 1600000, rangeEnd: 2000000, rate: '20%', limit: 2000000, percent: 20},
            {rangeStart: 2000000, rangeEnd: 2400000, rate: '25%', limit: 2400000, percent: 25},
            {rangeStart: 2400000, rangeEnd: income, rate: '30%', limit: income, percent: 30}
        ];
        let remainingIncome = income;
        let previousLimit = 0;

        const slabData = slabs
            .map(({rangeStart, rangeEnd, rate, limit, percent}) => {
                const taxableAmount = Math.max(0, Math.min(remainingIncome, limit - previousLimit));
                const maxPossibleTax = (400000 * percent) / 100;
                const taxedAmount = (taxableAmount * percent) / 100;
                const range = `₹${formatPrice(rangeStart)} to ₹${taxedAmount < maxPossibleTax ? formatPrice(income) : formatPrice(rangeEnd)}`;
                remainingIncome -= taxableAmount;
                previousLimit = limit;
                return {range, rate, taxedAmount};
            })
            .filter(({taxedAmount}) => !!taxedAmount);

        return slabData;
    }, []);

    const formatPrice = (price: number, minimumFractionDigits?: number) => {
        return price.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: minimumFractionDigits === undefined ? 0 : minimumFractionDigits
        });
    };

    const convertPriceToInt = (price: string) => parseInt(price.replace(/,/g, ''), 10);

    const handleCalculate = useCallback(() => {
        const stdDeduction = useStandardDeduction ? 75000 : 0;
        const taxableIncome = (convertPriceToInt(income) || 0) - stdDeduction;
        setTaxableIncome(taxableIncome);
        setStandardDeduction(stdDeduction);
        const slabData = calculateTaxSlabs(taxableIncome);
        setSlabData(slabData);
        const applicableTax = slabData.reduce((acc, {taxedAmount}) => acc + taxedAmount, 0);
        const cess = (applicableTax * 4) / 100;
        setCess(cess);
        setApplicableTax(applicableTax);
        setIncomeTax(applicableTax + cess);
    }, [calculateTaxSlabs, income, useStandardDeduction]);

    return (
        <div className="incometaxContainer">
            <Typography variant="h1" className="pageTitle">
                Income Tax Calculator
            </Typography>
            <Typography variant="h2" className="pageSubtitle">
                According to Budget Feb 2025
            </Typography>
            <div className="incometaxColumns">
                <div className="left-column">
                    <Section>
                        <div className="incomeTaxSection">
                            <Typography sx={{mb: 3}} variant="h4">
                                Income Details
                            </Typography>

                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Year Of Taxation</InputLabel>
                                <Select value={year} label="Year Of Taxation" onChange={setTaxationYear}>
                                    <MenuItem value="2025">Financial Year 2025-26 (AY 2026-27)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Tax Regime</InputLabel>
                                <Select value={regime} label="Tax Regime" onChange={setTaxationYear}>
                                    <MenuItem value="1">New Tax Regime</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                placeholder="Annual income"
                                variant="outlined"
                                value={income}
                                onChange={onIncomeChange}
                                fullWidth
                                margin="normal"
                            />
                            <FormControlLabel
                                sx={{mb: 2}}
                                control={
                                    <Checkbox checked={useStandardDeduction} onChange={onApplyStdDeductionChange} />
                                }
                                label="Use standard deduction (salaried employees)"
                            />
                            <Button
                                className="primary-button center"
                                type="submit"
                                variant="contained"
                                onClick={handleCalculate}
                                fullWidth
                            >
                                Calculate
                            </Button>
                        </div>
                    </Section>
                </div>

                <div className="right-column">
                    <Section>
                        <div className="incomeTaxSection">
                            <Typography sx={{mb: 3}} variant="h4">
                                Summary of Tax
                            </Typography>

                            <Typography variant="h6">Income Details</Typography>
                            <span className="summaryDistribution">
                                <span>Annual Income</span>
                                <span>₹{income ? income : 0}</span>
                            </span>

                            <Typography sx={{mt: 3}} variant="h6">
                                Deducations
                            </Typography>
                            <span className="summaryDistribution">
                                <span>Standard Deducation</span>
                                <span>-₹{formatPrice(standardDeduction)}</span>
                            </span>

                            <Typography sx={{mt: 3}} variant="h6">
                                Taxable Income
                            </Typography>
                            <span className="summaryDistribution">
                                <span>Income After Deductions</span>
                                <span>₹{formatPrice(taxableIncome)}</span>
                            </span>

                            {!!slabData.length && (
                                <>
                                    <Typography sx={{mt: 3}} variant="h6">
                                        Tax Slabs Calculation
                                    </Typography>

                                    <TableContainer component={Paper}>
                                        <Table size="small" sx={{minWidth: 650}} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Tax Slab</TableCell>
                                                    <TableCell align="right">Tax Rate</TableCell>
                                                    <TableCell align="right">Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {slabData.map((row) => (
                                                    <TableRow
                                                        key={row.range}
                                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.range}
                                                        </TableCell>
                                                        <TableCell align="right">{row.rate}</TableCell>
                                                        <TableCell align="right">
                                                            {formatPrice(row.taxedAmount)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}

                            <Typography sx={{mt: 3}} variant="h6">
                                Income Tax Calculation
                            </Typography>
                            <span className="summaryDistribution">
                                <span>Taxable Income</span>
                                <span>₹{formatPrice(taxableIncome)}</span>
                            </span>
                            <span className="summaryDistribution">
                                <span>Applicable Income Tax</span>
                                <span>₹{formatPrice(applicableTax)}</span>
                            </span>
                            <span className="summaryDistribution">
                                <span>Health and Education Cess (4%)</span>
                                <span>₹{formatPrice(cess)}</span>
                            </span>

                            <Typography sx={{mt: 3}} variant="h4">
                                Tax Liability
                            </Typography>
                            <div className="taxAmoundBanner">₹{formatPrice(incomeTax)}</div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};
export default IncomeTaxPage;
