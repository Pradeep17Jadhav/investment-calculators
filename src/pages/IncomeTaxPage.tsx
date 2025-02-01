import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import Section from '../components/Section/Section';
import './styles.css';
import {useCallback, useState} from 'react';

const IncomeTaxPage = () => {
    const [income, setIncome] = useState();
    const [standardDeduction, setStandardDeduction] = useState(true);
    const [year, setYear] = useState('2025');

    const setTaxationYear = useCallback((event: SelectChangeEvent) => {
        setYear(event.target.value);
    }, []);

    const onIncomeChange = useCallback((e: any) => setIncome(e.target.value), []);
    const onApplyStdDeductionChange = useCallback(() => setStandardDeduction((apply) => !apply), []);

    return (
        <div className="incometaxContainer">
            <Typography variant="h1" className="pageTitle">
                Income Tax Calculator
            </Typography>
            <Typography variant="h2">According to Budget Feb 2025</Typography>
            <div className="incometaxColumns">
                <div className="left-column">
                    <Section>
                        <Typography variant="h4">Income Details</Typography>

                        <FormControl fullWidth>
                            <InputLabel>Year of taxation</InputLabel>
                            <Select value={year} label="Assessment year" onChange={setTaxationYear}>
                                <MenuItem value="2025">Financial Year 2025-26 (AY 2026-27)</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            placeholder="Annual income"
                            variant="outlined"
                            type="number"
                            value={income}
                            onChange={onIncomeChange}
                            fullWidth
                        />

                        <FormControlLabel
                            control={<Checkbox checked={standardDeduction} onChange={onApplyStdDeductionChange} />}
                            label="Use standard deduction (salaries employees)"
                        />

                        <Button
                            className="primary-button center"
                            type="submit"
                            variant="contained"
                            sx={{width: 'auto'}}
                        >
                            Calculate
                        </Button>
                    </Section>
                </div>

                <div className="right-column">
                    <Section>
                        <Typography variant="h4">Summary of Income Tax</Typography>
                        <Typography variant="h6">Income Details</Typography>
                        <span className="summaryDistribution">
                            <span>Annual Salary</span>
                            <span>₹{income ? income : 0}</span>
                        </span>
                        <Typography variant="h6">Deducations</Typography>
                        <span className="summaryDistribution">
                            <span>Standard Deducation</span>
                            <span>-₹75,000</span>
                        </span>
                    </Section>
                </div>
            </div>
        </div>
    );
};
export default IncomeTaxPage;
