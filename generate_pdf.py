from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="John Doe", ln=1, align="C")
pdf.cell(200, 10, txt="Software Engineer", ln=1, align="C")
pdf.cell(200, 10, txt="Summary: Experienced developer with 5 years in Python.", ln=1, align="L")
pdf.output("test_resume.pdf")
print("PDF generated.")
